import { Dispatch, SetStateAction, useState } from 'react'

import { useRouter } from 'next/router'
import { useSessionStorage } from './useSessionStorage'

export type ErrorResponse = {
  name: string
  traceId: string
  message: string
  details: {
    field: string
    issue: string
    location: string
  }
}

export type UserState = {
  username: string
  refreshToken: string
  accessToken: string
  did: string
  authorizedAsIssuer: boolean
  authorizedAsHolder: boolean
  loading: boolean
  vcOfferToken: string
}

const BASIC_STATE: UserState = {
  username: '',
  accessToken: '',
  did: '',
  refreshToken: '',
  authorizedAsHolder: false,
  authorizedAsIssuer: false,
  loading: true,
  vcOfferToken: '',
}

export const useAuthentication = () => {
  const [authState, setAuthState] = useState<UserState>(BASIC_STATE)
  const { getItem } = useSessionStorage()
  const router = useRouter()

  const updatePartiallyState =
    <T>(updateFunction: Dispatch<SetStateAction<T>>) =>
    (newState: Partial<T>) => {
      updateFunction((prev) => ({ ...prev, ...newState }))
    }
  const updateAuthState = updatePartiallyState<typeof authState>(setAuthState)

  const authenticate = async () => {
    if (router.pathname.includes('/issuer')) {
      updateAuthState({ loading: false, authorizedAsIssuer: Boolean(getItem('issuerLogin') && getItem('issuerPassword')) })
      return
    }

    if (router.pathname.includes('/holder')) {
      updateAuthState({ loading: false, authorizedAsHolder: Boolean(getItem('accessToken')) })
      return
    }

    updateAuthState({ loading: false, authorizedAsHolder: false, authorizedAsIssuer: false })
  }

  return { authState, setAuthState, updateAuthState, authenticate }
}
