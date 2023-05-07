import { operations } from '@GraphQL/operations'
import { useMutation } from '@apollo/client'
import { authUserContext } from '@context/authContext'
import { MsgsData, MsgsVar, SendMsgVar } from '@types'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import ObjectID from 'bson-objectid'
import { useParams } from 'react-router-dom'

export const useSubmitMsg = () => {
  const conversationId = useParams().conversationId as string
  const { user } = useContext(authUserContext)
  const [msg, setMsg] = useState<string>('')

  const [sendMsg] = useMutation<{ sendMsg: boolean }, SendMsgVar>(
    operations.message.Mutations.sendMsg
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!msg) return

    setMsg('')
    try {
      // send Msg Mutation
      const senderId = user?.id as string
      const newMsgId = ObjectID().toHexString()
      const newMsg: SendMsgVar = {
        id: newMsgId,
        body: msg,
        senderId,
        conversationId,
      }

      const { data, errors } = await sendMsg({
        variables: {
          ...newMsg,
        },
        optimisticResponse: {
          sendMsg: true,
        },
        update: (cache) => {
          const exist = cache.readQuery<MsgsData, MsgsVar>({
            query: operations.message.Queries.msgs,
            variables: { conversationId },
          }) as MsgsData

          cache.writeQuery<MsgsData, MsgsVar>({
            query: operations.message.Queries.msgs,
            variables: { conversationId },
            data: {
              ...exist,
              msgs: [
                {
                  ...newMsg,
                  sender: {
                    id: user?.id as string,
                    username: user?.username as string,
                  },
                  createdAt: new Date(Date.now()),
                  updatedAt: new Date(Date.now()),
                },
                ...exist.msgs,
              ],
            },
          })
        },
      })

      if (!data?.sendMsg || errors) {
        throw new Error('failed to send Msg')
      }
    } catch (err: any) {
      console.error('handleSubmit > onSendMsg > Error 💣 💥 => ', err)
      toast.error(err?.message)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMsg(e.target.value)

  return { handleSubmit, handleChange, msg }
}
