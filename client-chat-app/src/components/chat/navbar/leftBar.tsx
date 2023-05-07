import { useContext, useState } from "react";
import { ConversationFE } from "@types";
import { Room } from "./room";
import { SkeletonConversationList } from "../skeleton";
import { ConversationModal } from "./modal/conversationModal";
import { authUserContext } from "@context/index";
import { useNavigate } from "react-router-dom";
import css from "@styles/chat/navbar/leftBar.module.css";
import { useGetConversations, useAddAndRemoveUser, useSubsConversationDelete } from "@hooks/index";
import { GlowMenu } from "./glowMenu";
////////////////////////////////////////
export const LeftBar = () => {
  //-----------------------------------------------------------
  const [edit, setEdit] = useState<ConversationFE | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewMenuUser, setViewMenuUser] = useState<boolean>(false);
  const navigate = useNavigate();
  //--------------------------------------------
  const { logOut } = useContext(authUserContext);
  //---------------------------------------------
  const { conversations } = useGetConversations();
  //---------------------------------------------
  // subscription add user and remove user
  useAddAndRemoveUser();
  // ---------------------------------
  // Subscription Deleted Conversation
  useSubsConversationDelete();
  //-------------------------
  const optionsMenu = [
    { name: "profile", action: () => {} },
    {
      name: "logOut",
      action: () => {
        logOut();
        navigate("/login");
      },
    },
  ];
  //------------------------------------------------------
  return (
    <section className={`${css.conversation_container}`}>
      {/* ------------------------------------------------ */}
      {isOpen && (
        <ConversationModal
          conversations={conversations || []}
          close={setIsOpen}
          editingConversation={edit}
        />
      )}
      {/* ------------------------------------------------ */}
      <button className={css.btn_Add} onClick={() => setIsOpen((state) => !state)}>
        <span />
        <span />
      </button>
      {/* ------------------------------------------------ */}
      <div className={`${css.list_container}`}>

        {!conversations ? (
          <SkeletonConversationList cont={14} />
        ) : (
          conversations?.map((c) => (
            <Room
              key={c.id}
              conversation={c}
              setEditingConversation={setEdit}
              setIsOpen={setIsOpen}
            />
          ))
        )}
      </div>
      {/* ------------------------------------------------- */}
      <div className={`${css.userOptions}`}>
        <button onClick={() => setViewMenuUser((prev) => !prev)}>
          <span />
          <span />
          <span />
        </button>
        {viewMenuUser && <GlowMenu style={css.positionMenuUser} options={optionsMenu} view={setViewMenuUser} />}
      </div>
      {/* ------------------------------------------------- */}
    </section>
  );
};
