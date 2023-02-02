import { SyntheticEvent, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useSessionStorage } from 'hooks/holder/useSessionStorage'
import { useConfirmSignIn } from 'shared/ConfirmSignInForm/useConfirmSignIn'
import { useConfirmSignInMutation, useHolderSignInMutation } from 'hooks/useAuthentication'
import { useAuthContext } from 'hooks/useAuthContext'
import { ROUTES } from 'utils'

export const useHolderConfirmSignIn = () => {
  const storage = useSessionStorage()
  const router = useRouter()
  const { authState, updateAuthState } = useAuthContext()
  const { data, error, mutateAsync, isLoading } = useConfirmSignInMutation()
  const { data: signInData, mutateAsync: signInMutateAsync } = useHolderSignInMutation()
  const { pathTo, computedCode, inputs, isButtonDisabled } = useConfirmSignIn(error?.message)

  const handleResendCode = async () => {
    if (!authState.username) {
      router.push(ROUTES.holder.signIn)
      return
    }
    await signInMutateAsync({ username: authState.username })
  }

  const onSubmit = async (e?: SyntheticEvent) => {
    e?.preventDefault()

    await mutateAsync({
      token: storage.getItem('signUpToken') || '',
      confirmationCode: computedCode,
    })
  }

  useEffect(() => {
    if (data) {
      storage.setItem('accessToken', data.accessToken)
      updateAuthState({
        ...authState,
        loading: false,
        authorizedAsHolder: true,
      })
      if (authState.vcOfferToken) {
        router.push(ROUTES.holder.claimVc)
      } else if (authState.vcHash && authState.vcKey) {
        router.push(ROUTES.holder.onboard)
      } else router.push(pathTo(authState.appFlow))
    }
    if (authState.username === '') {
      router.push(ROUTES.holder.signIn)
    }
  }, [data, error, router])

  useEffect(() => {
    if (signInData) {
      storage.setItem('signUpToken', signInData)
    }
  }, [signInData, storage])

  return { error, onSubmit, inputs, isButtonDisabled, handleResendCode, isLoading }
}
