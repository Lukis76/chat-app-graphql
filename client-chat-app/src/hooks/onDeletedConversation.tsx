import { useMutation } from "@apollo/client";
import { operations } from "@GraphQL/index";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export const useOnDeletedConversation = () => {
  //-------------------------------------------
  const navigate = useNavigate()
  // const router = useRouter();
  //------------------------------------------------------------------------------------------------
  const [deleteConversation] = useMutation<{ deleteConversation: boolean; conversationId: string }>(
    operations.conversation.Mutations.deleteConversation
  );
  //------------------------------------------------------------------------------------------------

  const onConversationDeleted = async (conversationId: string) => {
    try {
      toast.promise(
        deleteConversation({
          variables: { conversationId },
          update: () => {
            navigate('/chat')
            // router.replace(
            //   typeof process.env.PUBLIC_URL === "string" ? process.env.PUBLIC_URL : ""
            // );
          },
        }),
        {
          loading: "Deleted Conversation...",
          error: "Deleted Conversation failed!",
          success: "Delete Conversation Success!",
        }
      );
    } catch (err) {
      console.error("Deleted conversation Error", err);
    }
  };
  //-------------------------------
  return { onConversationDeleted };
};
