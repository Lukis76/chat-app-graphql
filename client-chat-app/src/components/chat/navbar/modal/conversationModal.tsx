import {
  ConversationFE,
  ConversationParticipant,
  SearchUser,
  SearchUsersData,
  SearchUsersInput,
} from "@types";
import { Participants } from "./participants";
import { UserSearchList } from "./useSearchList";
import { useLazyQuery } from "@apollo/client";
import { SvgLoading } from "@assets/svg";
import { useRoom, useViewConversation } from "@hooks/index";
import { operations } from "@GraphQL/index";
import { Dispatch, FC, FormEvent, SetStateAction, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { authUserContext } from "@context/index";
import css from "@styles/chat/navbar/modal/modal.module.css";
import style from "@styles/chat/navbar/modal/form_modal.module.css";

type TypeConversationModal = {
  close: Dispatch<SetStateAction<boolean>>;
  conversations: Array<ConversationFE>;
  editingConversation: ConversationFE | null;
};

export type TypeState = {
  username: string;
  participants: Array<SearchUser>;
  existConversation: ConversationFE | null;
};

export const ConversationModal: FC<TypeConversationModal> = ({
  close,
  conversations,
  editingConversation,
}) => {
  //----------------------------------------------
  const [state, setState] = useState<TypeState>({
    username: "",
    participants: [],
    existConversation: null,
  });
  //-------------------------------------------
  const { user } = useContext(authUserContext);
  const { onViewConversation } = useViewConversation();
  //----------------------------------------------------------------------------------------------
  const [searchUsers, { data, loading, error }] = useLazyQuery<SearchUsersData, SearchUsersInput>(
    operations.user.query.SEARCH_USERS
  );
  //-----------------------------------------------------------
  const { onCreatedRoom, loadingCreateConversation } = useRoom(
    conversations,
    state,
    setState,
    close
  );
  //---------------------------------------------------
  const handleSubmitSearch = async (e: FormEvent) => {
    e.preventDefault();
    searchUsers({ variables: { username: state.username } });
  };
  //----------------------------------------------------------
  useEffect(() => {
    if (state.existConversation) {
      setState((prev) => ({
        ...prev,
        participants: prev.existConversation
          ? prev.existConversation.participants.map((p) => p.user)
          : [],
      }));
      return;
    }
  }, [editingConversation]);
  //----------------------------------
  const onConversationClick = () => {
    if (!state.existConversation) return;

    const { hasSeenLatestMsg } = state.existConversation.participants.find(
      (p) => p.user.id === user?.id
    ) as ConversationParticipant;

    onViewConversation(state.existConversation.id, hasSeenLatestMsg, user);
    close((state) => !state);
  };
  //--------------------------
  const handleClose = () => {
    setState((prev) => ({
      ...prev,
      username: "",
      participants: [],
    }));
    close((state) => !state);
  };
  //---------------------------------------
  if (error) {
    toast.error(error.message.toString());
    return null;
  }
  //---------------------------------------
  return (
    <div className={`${css.modal}`}>
      <button className={`${css.modal}`} onClick={handleClose} />
      <section>
        {/* --------------------------------------------------------------- */}
        <div className={`${css.close}`}>
          <button onClick={handleClose}>
            <span />
            <span />
          </button>
        </div>
        {/* --------------------------------------------------------------- */}
        <h2>{editingConversation ? "Editing Room" : "Created Room"}</h2>
        {/* --------------------------------------------------------------- */}
        <form onSubmit={handleSubmitSearch} className={`${style.form}`}>
          <input
            type="text"
            autoFocus={true}
            value={state.username}
            placeholder="insert"
            onChange={(e) => setState((prev) => ({ ...prev, username: e.target.value }))}
          />
          <button type="submit" disabled={!state.username}>
            {loading ? <SvgLoading size={24} /> : "Search"}
          </button>
        </form>
        {/* --------------------------------------------------------------- */}
        {data?.searchUsers && (
          <UserSearchList users={data?.searchUsers} setState={setState} state={state} />
        )}
        {/* --------------------------------------------------------------- */}
        {state.participants.length !== 0 && (
          <>
            {state.participants.length > 0 ? (
              <Participants state={state} setState={setState} />
            ) : (
              <p>the minimum number of participants is two </p>
            )}
            <button onClick={() => onCreatedRoom(editingConversation)}>
              {loadingCreateConversation ? <SvgLoading size={24} /> : "Create room"}
            </button>
          </>
        )}
        {/* --------------------------------------------------------------- */}
      </section>
    </div>
  );
};
