import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useSessionStorage } from 'hooks/holder/useSessionStorage'
import { useAuthContext } from 'hooks/useAuthContext'
import { useIssuerSignInMutation } from 'hooks/useAuthentication'
import { ROUTES } from 'utils'

export const useIssuerSignIn = () => {
  const [username, setUsername] = useState('')
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
    if (!validateEmail(username)) {
      setInputError('This is not a valid email address.')
      return
    }

    updateAuthState({ username })
    await mutateAsync({ username })
  }

  useEffect(() => {
    if (data) {
      storage.setItem('signUpToken', data.token)

      if (!error) {
        router.push(`${ROUTES.issuer.confirmSignIn}${data.signup ? '?signup=true' : ''}`)
      }
    }
  }, [data, error, router, storage])

  const disabled = !username || isLoading

  return {
    disabled,
    error,
    isLoading,

    handleSignIn,
    setUsername,
    inputError,
    setInputError,
  }
}
