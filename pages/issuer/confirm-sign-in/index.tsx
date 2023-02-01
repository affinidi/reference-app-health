import { FC } from 'react'

import { ConfirmSignInForm } from 'modules/shared/ConfirmSignInForm/ConfirmSignInForm'

import { useIssuerConfirmSignIn } from './useIssuerConfirmSignIn'

export const IssuerConfirmSignIn: FC = () => {
  const { error, onSubmit, inputs, isButtonDisabled, handleResendCode } = useIssuerConfirmSignIn()

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

export default IssuerConfirmSignIn