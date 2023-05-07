import { authUserContext } from '@context/index'
import { Dispatch, SetStateAction, useContext } from 'react'
import { toast } from 'react-hot-toast'
import { ConversationFE, TypeState } from '@types'
import { useCreateConversation } from './createConversation'
import { useUpdateConversation } from './updateConversation'

// export type TypeState = {
//   username: string
//   participants: Array<SearchUser>
//   existConversation: ConversationFE | null
// }

export const useRoom = (
  conversations: Array<ConversationFE>,
  state: TypeState,
  setState: Dispatch<SetStateAction<TypeState>>,
  close: Dispatch<SetStateAction<boolean>>
) => {
  const { user: userId } = useContext(authUserContext)

  const { onCreateConversation, loadingCreateConversation } =
    useCreateConversation(state, setState, close)

  const { onUpdateConversation } = useUpdateConversation(
    state.participants,
    setState,
    close
  )

  const existConversation = (participantIds: Array<string>) => {
    let exist: ConversationFE | null = null

    for (const conversation of conversations) {
      const addParticipants = conversation.participants.filter(
        (p) => p.user.id !== userId
      )

      if (addParticipants.length !== participantIds.length) continue
      let allMathchingParticipants: boolean = false

      for (const participant of addParticipants) {
        const foundParticipant = participantIds.find(
          (p) => p === participant.user.id
        )

        if (!foundParticipant) {
          allMathchingParticipants = false
          break
        }

        allMathchingParticipants = true
      }
      if (allMathchingParticipants) {
        exist = conversation
      }
    }
    return { exist }
  }

  const onCreatedRoom = (editingConversation: ConversationFE | null) => {
    if (!state.participants.length) return
    const participantIds = state.participants.map((p) => p.id)

    const { exist } = existConversation(participantIds)

    if (exist) {
      toast('Conversation already exists')
      setState((prev) => ({
        ...prev,
        existConversation: exist,
      }))
      return
    }

    editingConversation
      ? onUpdateConversation(editingConversation)
      : onCreateConversation()
  }

  return { onCreatedRoom, loadingCreateConversation }
}
