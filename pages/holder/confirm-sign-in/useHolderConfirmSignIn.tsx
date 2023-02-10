import { SyntheticEvent, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useSessionStorage } from 'hooks/useSessionStorage'
import { useConfirmSignIn } from 'pages/components/ConfirmSignInForm/useConfirmSignIn'
import { useAuthContext } from 'hooks/useAuthContext'

import { ROUTES } from 'utils'
import { useHolderApi } from '../../../hooks/holder/useHolderApi'

export const useHolderConfirmSignIn = () => {
  const storage = useSessionStorage()
  const router = useRouter()
  const { authState, updateAuthState } = useAuthContext()
  const { signInMutation, confirmSignInMutation } = useHolderApi()
  const { computedCode, inputs, isButtonDisabled } = useConfirmSignIn(confirmSignInMutation.error?.message)

  const handleResendCode = async () => {
    if (!authState.username) {
      router.push(ROUTES.holder.signIn)
      return
    }
    signInMutation.mutate({ username: authState.username })
  }

  const onSubmit = (e?: SyntheticEvent) => {
    e?.preventDefault()

    confirmSignInMutation.mutate({
      token: storage.getItem('signUpToken')!,
      confirmationCode: computedCode,
    })
  }

  useEffect(() => {
    if (confirmSignInMutation.data && !authState.authorizedAsHolder) {
      storage.setItem('accessToken', confirmSignInMutation.data.accessToken)
      updateAuthState({
        loading: false,
        authorizedAsHolder: true,
      })

      if (authState.vcOfferToken) {
        router.push(ROUTES.holder.claimVc)
      }
    }

    if (authState.username === '') {
      router.push(ROUTES.holder.signIn)
    }
  }, [authState.authorizedAsHolder, authState.vcOfferToken, authState.username, confirmSignInMutation.data, router, storage, updateAuthState])

  useEffect(() => {
    if (signInMutation.data) {
      storage.setItem('signUpToken', signInMutation.data.token)
    }
  }, [signInMutation.data, storage])

  return {
    error: confirmSignInMutation.error,
    isLoading: confirmSignInMutation.isLoading,
    onSubmit,
    inputs,
    isButtonDisabled,
    handleResendCode,
  }
}
