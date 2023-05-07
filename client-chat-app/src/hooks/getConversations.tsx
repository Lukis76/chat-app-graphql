import { useQuery } from '@apollo/client'
import { operations } from '@GraphQL/index'
import {
  ConversationCreatedSubscriptionData,
  ConversationData,
  ConversationFE,
} from '@types'
import { useEffect, useState } from 'react'

export const useGetConversations = () => {
  const [conversations, setConversations] = useState<
    Array<ConversationFE> | undefined
  >(undefined)

  //-------------------------------------------
  const { data, loading, error, subscribeToMore } = useQuery<ConversationData>(
    operations.conversation.Queries.conversations,
    {
      onCompleted: (data) => {
        setConversations(
          [...data.conversations].sort(
            (a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf()
          )
        )
      },
      variables: {
        token: localStorage.getItem('token'),
      },
    }
  )

  useEffect(() => {
    subscribeToMore({
      document: operations.conversation.Subscriptions.created,
      updateQuery: (
        prev,
        { subscriptionData }: ConversationCreatedSubscriptionData
      ) => {
        if (!subscriptionData.data) return prev
        const newConversation = subscriptionData.data.conversationCreated
        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev?.conversations],
        })
      },
    })
  }, [])

  return {
    conversations,
    loading,
    error,
    data,
  }
}
