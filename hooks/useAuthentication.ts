import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useState } from 'react'

import { cloudWalletService } from 'services/cloud-wallet'
import { ConfirmSignInInput, ConfirmSignInOutput, SignInInput, } from 'services/cloud-wallet/cloud-wallet.api'
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
export const holderSignIn = async ({ username }: SignInInput): Promise<string> => {
  const { data: { token } } = await axios<{ token: string }>(
    `${hostUrl}/api/holder/sign-in`,
    { method: 'POST', data: { username } }
  )

  return token
}

export const holderConfirmSignin = async ({
  token,
  confirmationCode,
}: ConfirmSignInInput): Promise<{ accessToken: string }> => {
  const { data: { accessToken } } = await axios<{ accessToken: string }>(
    `${hostUrl}/api/holder/confirm-sign-in`,
    { method: 'POST', data: { token, confirmationCode } }
  )

  return { accessToken }
}

export const logout = async (authState: UserState) => {
  if (authState.authorizedAsHolder) {
    try {
      await cloudWalletService.logOut()
    } catch (e) {}
  }

  clearSessionStorage()
}

export const useHolderSignInMutation = () => {
  return useMutation<string, ErrorResponse, SignInInput, () => void>(
    (data: SignInInput) => holderSignIn(data)
  )
}

export const useConfirmSignInMutation = () => {
  return useMutation<
    { accessToken: string },
    ErrorResponse,
    ConfirmSignInInput,
    () => void
  >((data: ConfirmSignInInput) => holderConfirmSignin(data))
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
