import type { ConversationParticipant } from '@types'

export const formatUsersName = (
  participants: Array<ConversationParticipant>,
  myId: string
): string[] => {
  return participants
    .filter((p) => p?.user?.id != myId)
    .map((p) => p?.user?.username)
}
