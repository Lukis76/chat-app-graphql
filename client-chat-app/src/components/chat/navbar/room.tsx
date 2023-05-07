import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { ConversationFE } from "@types";
import ReactTimeAgo from "react-time-ago";
import { useOnDeletedConversation, useViewConversation } from "@hooks/index";
import { authUserContext } from "@context/index";
import { useParams } from "react-router-dom";
import css from "@styles/chat/navbar/room.module.css";
import { formatUsersName } from "@components/utils/formatUserName";
import { GlowMenu, OptionsGlowMenu } from "./glowMenu";

type RoomType = {
  conversation: ConversationFE;
  setEditingConversation: Dispatch<SetStateAction<ConversationFE | null>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const DEFAUT_IMG =
  "https://thumbs.dreamstime.com/b/conceptual-hand-writing-showing-breakout-session-business-photo-showcasing-workshop-discussion-presentation-specific-topic-125699196.jpg";

export const Room: FC<RoomType> = ({ conversation, setEditingConversation, setIsOpen }) => {
  //------------------
  const customImg = "";
  const { conversationId } = useParams();
  const { user } = useContext(authUserContext);
  const { onViewConversation } = useViewConversation();
  const { onConversationDeleted } = useOnDeletedConversation();
  const [contextMenu, setContextMenu] = useState<boolean>(false);
  //---------------------------------------------------------------
  const getUserParticipant = (conversation: ConversationFE) => {
    return Boolean(conversation.participants.find((p) => p.user.id === user?.id)?.hasSeenLatestMsg);
  };
  //---------------------------------------------------------------
  const handleClick = (e: React.MouseEvent) => {
    if (e.type === "click") {
      onViewConversation(conversation.id, getUserParticipant(conversation), user);
    } else if (e.type === "contextmenu") {
      e.preventDefault();
      setContextMenu(true);
    }
  };
  //--------------------------------------------------------------
  const optionsMenu: OptionsGlowMenu = [
    {
      name: "Edit",
      action: () => {
        setEditingConversation(conversation);
        setIsOpen(true);
        setContextMenu(false);
      },
    },
    {
      name: "Delete",
      action: async () => {
        await onConversationDeleted(conversation.id);
        setContextMenu(false);
      },
    },
  ];
  //--------------------------------------------------------------
  return (
    <div
      aria-checked={conversation.id === conversationId ? "true" : "false"}
      // ${ conversation.id === conversationId && 'bg-zinc-600'}
      className={`${css.room}`}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {/* --------------------------------------------------------------- */}
      {contextMenu && (
        <GlowMenu style={css.positionContextMenu} options={optionsMenu} view={setContextMenu} />
      )}
      {/* --------------------------------------------------------------- */}
      <div className={`${css.info}`}>
        <div className={`${css.avatar}`}>
          <img
            aria-checked={getUserParticipant(conversation)}
            src={customImg || DEFAUT_IMG}
            alt={"img room"}
          />
        </div>
        <div className={`${css.expand}`}>
          <div>
            <p className="text-sm truncate">
              {formatUsersName(conversation.participants, user?.id as string)}
            </p>
            -
            <span className="text-xs">
              <ReactTimeAgo date={Number(new Date(conversation.updatedAt))} timeStyle={"twitter"} />
            </span>
          </div>
          <div className="">
            <span className="">{conversation?.latestMsg?.body}</span>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------------- */}
    </div>
  );
};
