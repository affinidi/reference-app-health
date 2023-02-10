import { Dispatch, SetStateAction, useState } from 'react'

import { useRouter } from 'next/router'
import { useCheckIssuerAuthMutation } from './issuer/api'
import { useCheckHolderAuthMutation } from './holder/api'

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
  const router = useRouter()
  const [authState, setAuthState] = useState<UserState>(BASIC_STATE)
  const { mutateAsync: mutateIssuerAuthCheck } = useCheckIssuerAuthMutation()
  const { mutateAsync: mutateHolderAuthCheck } = useCheckHolderAuthMutation()

  const updatePartiallyState =
    <T>(updateFunction: Dispatch<SetStateAction<T>>) =>
    (newState: Partial<T>) => {
      updateFunction((prev) => ({ ...prev, ...newState }))
    }
  const updateAuthState = updatePartiallyState<typeof authState>(setAuthState)

  const authenticate = async () => {
    if (router.pathname.includes('/issuer')) {
      try {
        await mutateIssuerAuthCheck()
        updateAuthState({ loading: false, authorizedAsIssuer: true })
      } catch (error) {
        updateAuthState({ loading: false, authorizedAsIssuer: false })
      }

      return
    }

    if (router.pathname.includes('/holder')) {
      try {
        await mutateHolderAuthCheck()
        updateAuthState({ loading: false, authorizedAsHolder: true })
      } catch (error) {
        updateAuthState({ loading: false, authorizedAsHolder: false })
      }

      return
    }

    updateAuthState({ loading: false, authorizedAsHolder: false, authorizedAsIssuer: false })
  }

  return { authState, setAuthState, updateAuthState, authenticate }
}
