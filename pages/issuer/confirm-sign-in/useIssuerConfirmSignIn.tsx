import { SyntheticEvent, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useSessionStorage } from 'hooks/holder/useSessionStorage'
import { useConfirmSignIn } from 'shared/ConfirmSignInForm/useConfirmSignIn'
import { useIssuerConfirmSignInMutation, useIssuerSignInMutation } from 'hooks/useAuthentication'
import { useAuthContext } from 'hooks/useAuthContext'

import { ROUTES } from 'utils'

import queryString from 'query-string'

export const useIssuerConfirmSignIn = () => {
  const storage = useSessionStorage()
  const router = useRouter()
  const { authState, updateAuthState } = useAuthContext()
  const { data, error, mutateAsync, isLoading } = useIssuerConfirmSignInMutation()
  const { data: signInData, mutateAsync: signInMutateAsync } = useIssuerSignInMutation()
  const { pathTo, computedCode, inputs, isButtonDisabled } = useConfirmSignIn(error?.message)

  const onSubmit = async (e?: SyntheticEvent) => {
    e?.preventDefault()

    const isSignUp = queryString.parse(window.location.search).signup === 'true'

    await mutateAsync({
      token: storage.getItem('signUpToken') || '',
      confirmationCode: computedCode,
      signup: isSignUp,
    })
  }

  const handleResendCode = async () => {
    if (!authState.username) {
      router.push(ROUTES.holder.signIn)
      return
    }
    await signInMutateAsync({ username: authState.username })
  }

  useEffect(() => {
    if (data) {
      updateAuthState({
        ...authState,
        loading: false,
        authorizedAsIssuer: true,
      })
      router.push(pathTo(authState.appFlow))
    }
    if (authState.username === '') {
      router.push(ROUTES.issuer.signIn)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, router])

  useEffect(() => {
    if (signInData) {
      storage.setItem('signUpToken', signInData.token)
    }
  }, [signInData, storage])

  return { error, onSubmit, inputs, isButtonDisabled, isLoading, handleResendCode }
}
