import { FC } from 'react'

import { ConfirmSignInForm } from 'shared/ConfirmSignInForm/ConfirmSignInForm'

import { useHolderConfirmSignIn } from './useHolderConfirmSignIn'

export const HolderConfirmSignIn: FC = () => {
  const { error, onSubmit, inputs, isButtonDisabled, isLoading, handleResendCode } =
    useHolderConfirmSignIn()

  return (
    <ConfirmSignInForm
      error={error}
      onSubmit={onSubmit}
      inputs={inputs}
      isButtonDisabled={isButtonDisabled}
      isLoading={isLoading}
      handleResendCode={handleResendCode}
    />
  )
}

export default HolderConfirmSignIn
