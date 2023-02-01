import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { SignInInput } from 'services/cloud-wallet/cloud-wallet.api'
import { useSessionStorage } from 'hooks/holder/useSessionStorage'
import { useAuthContext } from 'hooks/useAuthContext'
import { useIssuerSignInMutation } from 'hooks/useAuthentication'
import { ROUTES } from 'utils'

export const useIssuerSignIn = () => {
  const [signInInput, setSignInInput] = useState<SignInInput>({ username: '' })
  const [inputError, setInputError] = useState<string | null>(null)
  const router = useRouter()
  const storage = useSessionStorage()
  const { authState, updateAuthState } = useAuthContext()
  const { data, mutateAsync, error, isLoading } = useIssuerSignInMutation()

  const validateEmail = (email: string) =>
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    setInputError(null)
    if (!validateEmail(signInInput.username)) {
      setInputError('This is not a valid email address.')
      return
    }
    await mutateAsync(signInInput)
  }

  useEffect(() => {
    if (!data) {
      return
    }

    storage.setItem('signUpToken', data.token)
    updateAuthState({ ...authState, username: signInInput.username })
    if (!error) {
      router.push(`${ROUTES.issuer.confirm_sign_in}${data.signup ? '?signup=true' : ''}`)
    }
  }, [data, error, storage, router, authState, updateAuthState, signInInput])

  const disabled = !signInInput.username || isLoading

  return {
    disabled,
    error,
    isLoading,

    handleSignIn,
    setSignInInput,
    inputError,
    setInputError,
  }
}
