import { Dispatch, FC, SetStateAction, useContext } from 'react'
import { SearchUser } from '@types'
import { TypeState } from './conversationModal'
import css from '@styles/chat/navbar/modal/searchList.module.css'
import { authUserContext } from '@context/authContext'
//---------------------------------------------------------------
type TypeUseSearchList = {
  users: Array<SearchUser>
  setState: Dispatch<SetStateAction<TypeState>>
  state: TypeState
}
//------------------------------------------------------
export const UserSearchList: FC<TypeUseSearchList> = ({
  users,
  setState,
  state,
}) => {
  //-----------------------------------------------
  const { user } = useContext(authUserContext)
  //-----------------------------------------------
  const addParticipant = (user: SearchUser) => {
    setState((prev) => ({
      ...prev,
      // username: '',
      participants: [...prev.participants, user],
    }))
  }
  //-----------------------------------------------
  return (
    <div
      className={`${css.content}`}
      // className="flex justify-center items-center w-full"
    >
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className='flex flex-col justify-start items-center w-full gap-1'>
          {users.map((u: SearchUser) => {
            return (
              !state.participants?.map((p) => p.id).includes(u.id) &&
              !state.participants?.map((p) => p.id).includes(user?.id as string) && (
                <div
                  key={u.id}
                  className={`${css.item} lukitas ${u.id}`}
                  // className="flex flex-row justify-between items-center pl-3 pr-1 py-1 rounded-lg hover:bg-zinc-800 w-full gap-4  max-w-md opacity-70 ease duration-75"
                >
                  <p className='truncate'>{u.username}</p>
                  <button
                    className='text-center hover:bg-zinc-900 text-zinc-300 rounded-lg p-2 bg-zinc-700 ease duration-75'
                    onClick={() => addParticipant(u)}
                  >
                    Select
                  </button>
                </div>
              )
            )
          })}
        </div>
      )}
    </div>
  )
}
