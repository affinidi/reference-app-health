import { FC } from 'react'

import { ConfirmSignInForm } from 'modules/shared/ConfirmSignInForm/ConfirmSignInForm'

import { useIssuerConfirmSignIn } from './useIssuerConfirmSignIn'

export const IssuerConfirmSignIn: FC = () => {
  const { error, onSubmit, inputs, isButtonDisabled, isLoading, handleResendCode } =
    useIssuerConfirmSignIn()

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
