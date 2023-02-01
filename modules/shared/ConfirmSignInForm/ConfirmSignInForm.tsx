import { FC, ReactNode } from 'react'

import { Box, Button, Container, Header, Typography } from 'components'

import * as S from './ConfirmSignInForm.styled'

type ConfirmSignInFormProps = {
  error: Error | null
  onSubmit(): void
  inputs: ReactNode
  isButtonDisabled: boolean
  handleResendCode(): void
}

export const ConfirmSignInForm: FC<ConfirmSignInFormProps> = ({
  error,
  onSubmit,
  inputs,
  isButtonDisabled,
  handleResendCode,
}) => {
  return (
    <>
      <Header title="Signin" />
      <Container>
        <div className="grid lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-start-2">
            <Typography variant="p1">
              Please enter the verification code you received in your email.
            </Typography>
            <S.Label $error={!!error} variant="p4">
              Verification code
            </S.Label>
            <form id="confirmation" onSubmit={onSubmit}>
              <S.VerificationFieldContainer direction="row" justifyContent="center">
                {inputs}
              </S.VerificationFieldContainer>
              {error && <Typography variant="e1">{error?.message}</Typography>}
            </form>

            <Button form="confirmation" type="submit" disabled={isButtonDisabled}>
              Sign in
            </Button>

            <Box>
              <S.Message variant="p2">
                Didn’t receive a code? Click{' '}
                <span
                  onClick={() => handleResendCode()}
                  onKeyPress={() => handleResendCode()}
                  role="button"
                  tabIndex={0}
                >
                  here
                </span>{' '}
                to send it again
              </S.Message>
            </Box>
          </div>
        </div>
      </Container>
    </>
  )
}
