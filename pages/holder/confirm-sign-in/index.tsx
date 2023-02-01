import { FC } from 'react'

import { ConfirmSignInForm } from 'modules/shared/ConfirmSignInForm/ConfirmSignInForm'

import { useHolderConfirmSignIn } from './useHolderConfirmSignIn'

export const HolderConfirmSignIn: FC = () => {
  const { error, onSubmit, inputs, isButtonDisabled, handleResendCode } = useHolderConfirmSignIn()

  return (
    <ConfirmSignInForm
      error={error}
      onSubmit={onSubmit}
      inputs={inputs}
      isButtonDisabled={isButtonDisabled}
      handleResendCode={handleResendCode}
    />
  )
}

export default HolderConfirmSignIn
