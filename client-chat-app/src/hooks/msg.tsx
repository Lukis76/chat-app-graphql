import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { authUserContext } from '@context/index'
import { operations } from '@GraphQL/index'
import { useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { MsgsData, MsgSubscriptionData } from '@types'

export const useMsg = () => {
  const conversationId = useParams().conversationId as string

  const { user } = useContext(authUserContext)

  const { data, loading, error, subscribeToMore } = useQuery<MsgsData>(
    operations.message.Queries.msgs,
    {
      variables: {
        conversationId,
        token: localStorage.getItem('token'),
      },
    }
  )

  useEffect(() => {
    subscribeToMore({
      document: operations.message.Subscriptions.msgSend,
      variables: {
        conversationId: conversationId,
      },
      updateQuery: (prev: any, { subscriptionData }: MsgSubscriptionData) => {
        if (!subscriptionData.data) return prev

        const newMsg = subscriptionData.data.msgSend

        return Object.assign({}, prev, {
          msgs:
            newMsg.sender.id === user?.id ? prev.msgs : [newMsg, ...prev.msgs],
        })
      },
    })
  }, [conversationId])

  if (error) {
    toast.error('Error fetching msg')
    // return null;
  }

  return { data: data?.msgs, loading, userId: user?.id }
}
