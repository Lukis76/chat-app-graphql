import type { FC } from 'react'
import { Header } from './msg/header'
import { Input } from './msg/input'
import { Messages } from './msg/messages'
import { useParams } from 'react-router-dom'
import { useGetConversations } from '@hooks/getConversations'
import css from '@styles/chat/conversation/feedWrapper.module.css'
/////////////////////////////////////////////////////////////////
export const FeedWrapper: FC = () => {
  //------------------------------------
  const { conversationId } = useParams()
  //------------------------------------
  const { data } = useGetConversations()
  //-----------------------------------------------------
  const conversation = data?.conversations.find(
    (conversation) => conversation.id === conversationId
  )
  //-----------------------------------------------------
  return (
    <div className={`${css.msg_wrapper}`}>
      {conversationId && typeof conversationId === 'string' && conversation ? (
        <>
          <Header conversation={conversation} />
          <Messages />
          <Input />
        </>
      ) : (
        <span className={`${css.select}`}>seleciona una conversacion</span>
      )}
    </div>
  )
}
