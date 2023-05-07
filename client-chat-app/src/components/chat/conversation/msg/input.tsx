import { FC } from 'react'
import css from '@styles/chat/conversation/msg/imput.module.css'
import { useSubmitMsg } from '@hooks/index'

export const Input: FC = () => {
  const { handleSubmit, handleChange, msg } = useSubmitMsg()

  return (
    <form onSubmit={handleSubmit} className={`${css.form}`}>
      <input
        placeholder='New message'
        autoFocus
        type='text'
        value={msg}
        onChange={handleChange}
      />
      <button disabled={msg.length ? false : true} type='submit'>
        Send
      </button>
    </form>
  )
}
