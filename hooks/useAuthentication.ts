import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useState } from 'react'

import { useRouter } from 'next/router'
import { clearSessionStorage, useSessionStorage } from './useSessionStorage'
import axios from 'axios'
import { hostUrl } from '../pages/env'

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
export const holderSignIn = async (input: { username: string }): Promise<string> => {
  const { data: { token } } = await axios<{ token: string }>(
    `${hostUrl}/api/holder/sign-in`,
    { method: 'POST', data: input }
  )

  return token
}

export const holderConfirmSignin = async (input: {
  token: string;
  confirmationCode: string
}): Promise<{ accessToken: string }> => {
  const { data: { accessToken } } = await axios<{ accessToken: string }>(
    `${hostUrl}/api/holder/confirm-sign-in`,
    { method: 'POST', data: input }
  )

  return { accessToken }
}

export const logout = async (authState: UserState) => {
  if (authState.authorizedAsHolder) {
    // TODO: logout from holder's cloud wallet (implement an endpoint)
  }

  clearSessionStorage()
}

export const useHolderSignInMutation = () => {
  return useMutation<string, ErrorResponse, { username: string }, () => void>(
    (data) => holderSignIn(data)
  )
}

export const useConfirmSignInMutation = () => {
  return useMutation<
    { accessToken: string },
    ErrorResponse,
    { token: string; confirmationCode: string },
    () => void
  >((data) => holderConfirmSignin(data))
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
