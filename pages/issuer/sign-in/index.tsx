import { FC } from 'react'

import { SignInForm } from '../../components/SignInForm'

import { useIssuerSignIn } from './useIssuerSignIn'

const IssuerSignIn: FC = () => {
  const { handleSignIn, setUsername, disabled, error, isLoading, inputError, setInputError } =
    useIssuerSignIn()

  return (
    <SignInForm
      handleSignIn={handleSignIn}
      setUsername={setUsername}
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      role="issuer"
      inputError={inputError}
      setInputError={setInputError}
    />
  )
}

export default IssuerSignIn;