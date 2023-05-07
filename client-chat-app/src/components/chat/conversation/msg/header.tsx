import { SvgBack } from '@assets/svg/svgBack'
import { authUserContext } from '@context/index'
import { FC, useContext } from 'react'
import { ConversationFE, User } from '@types'
import { useNavigate } from 'react-router-dom'
import css from '@styles/chat/conversation/msg/header.module.css'

interface HeaderProps {
  conversation: ConversationFE
}

export const Header: FC<HeaderProps> = ({ conversation }) => {
  const navigate = useNavigate()

  const user = useContext(authUserContext).user as User | null

  const usersparticipantsNames = conversation?.participants
    .filter((u) => u.user.id != user?.id)
    .map((u) => u.user.username)
    .join(', ')

  return (
    <div
      className={`${css.header}`}
      // className='flex flex-row justify-start items-center truncate w-full py-1 px-2 bg-zinc-600 text-sm text-zinc-300 gap-2 absolute top-0'
    >
      {conversation ? (
        <>
          <button
            className='fill-zinc-900 -ml-1'
            onClick={() => navigate('/chat')}
          >
            <SvgBack size={28} />
          </button>
          <span className='text-zinc-900 text-base font-semibold'>
            <strong>{'Participants:'}</strong>
            {usersparticipantsNames}
          </span>
        </>
      ) : (
        <span className='animate-pulse w-full h-6 my-1  rounded-lg bg-zinc-500 opacity-20' />
      )}
    </div>
  )
}
