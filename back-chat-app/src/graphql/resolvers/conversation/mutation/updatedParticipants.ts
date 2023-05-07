import { GraphQLContext } from "../../../../utils/types";
import { GraphQLError } from "graphql";
import { subscriptionEvent } from "..";
import { validateToken } from "../../../../utils/validateToken";

export const updateParticipants = async (
  _: any,
  args: { conversationId: string; participantIds: Array<string> },
  context: GraphQLContext
): Promise<boolean> => {
  ////////////////////////////////////////////
  const { prisma, token, pubsub } = context;
  const { conversationId, participantIds } = args;
  //------------------------------------------
  // authorized Token
  await validateToken(token);
  //--------------------------------------------------------
  try {
    const participants = await prisma.conversationParticipant.findMany({
      where: {
        conversationId,
      },
    });
    //-------------------------------------------------------------------------
    const existParticipants = participants.map((p: {userId: string}) => p.userId);
    //--------------------------------------------------------
    const participantsDeleted = existParticipants.filter(
      (id: string) => !participantIds.includes(id)
    );
    //-------------------------------------------------------
    const participantsCreated = participantIds.filter(
      (id) => !existParticipants.includes(id)
    );
    //-------------------------------------------------------
    const transactionStatements = [
      prisma.conversation.update({
        where: {
          id: conversationId,
        },
        data: {
          participants: {
            deleteMany: {
              userId: {
                in: participantsDeleted,
              },
              conversationId,
            },
          },
        },
        include: {
          participants: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
          latestMsg: {
            include: {
              sender: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
      }),
    ];
    //------------------------------------------------
    if (participantsCreated.length) {
      transactionStatements.push(
        prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            participants: {
              createMany: {
                data: participantsCreated.map((id) => ({
                  userId: id,
                  hasSeenLatestMsg: true,
                })),
              },
            },
          },
          include: {
            participants: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
              },
            },
            latestMsg: {
              include: {
                sender: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
              },
            },
          },
        })
      );
    }
    //--------------------------------------------------------------
    const [deletedUpdated, addUpdated] = await prisma.$transaction(
      transactionStatements
    );
    //--------------------------------------------------------------
    pubsub.publish(subscriptionEvent.conversationUpdated, {
      conversationUpdated: {
        conversation: addUpdated || deletedUpdated,
        addUserIds: participantsCreated,
        removeUserIds: participantsDeleted,
      },
    });
    //-----------------------------------
    return true;
    //----------------------------------------
  } catch (err) {
    console.log("CreateConversationError", err);
    throw new GraphQLError("Error created conversation");
  }
};
