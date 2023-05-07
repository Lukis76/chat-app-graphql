import { FC, useReducer } from 'react'
import {
  authUserContext,
  authReducer,
  AuthUserProviderProps,
  InitialStateProps,
  UserDataTypes,
} from '@context/index'
//////////////////////////////////////////////////////////////////////////////////
const storage = () => {
  const user = typeof window !== 'undefined' && localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}
/////////////////////////////////////////////////
const initialState: InitialStateProps = {
  user: storage(),
}
///////////////////////////////////////////////////////////////////////////////
export const AuthUserProvider: FC<AuthUserProviderProps> = ({ children }) => {
  //--------------------------------------------------------------------------
  const [state, dispatch] = useReducer(authReducer, initialState)
  //--------------------------------------------------------------
  const login = async (userData: UserDataTypes) => {
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', JSON.stringify(userData.token))
    }

    return dispatch({
      type: 'LOGIN',
      payload: userData,
    })
  }
  //---------------------
  const logOut = () => {
    localStorage.clear()

    return dispatch({
      type: 'LOGOUT',
    })
  }
  //-----------------------------------------------------------------------
  return (
    <authUserContext.Provider value={{ user: state.user, login, logOut }}>
      {children}
    </authUserContext.Provider>
  )
  //-----------------------------------------------------------------------
}
