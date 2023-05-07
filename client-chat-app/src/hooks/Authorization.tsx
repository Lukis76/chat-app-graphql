import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

//////////////////////////////////////////////////
const OPERATION_REFRESH = gql`
  query Refresh($token: String) {
    refresh(token: $token) {
      timeOut
    }
  }
`
//////////////////////////////////////////////////////////////////////
export const useAuthorization = (initial = undefined) => {
  const [check, setCheck] = useState<boolean | undefined>(initial)

  useQuery(OPERATION_REFRESH, {
    onCompleted(data) {
      setCheck(data?.refresh?.timeOut)
    },
    fetchPolicy: 'no-cache',
    variables: {
      token: localStorage.getItem('token'),
    },
  })

  return {
    check,
  }
}
