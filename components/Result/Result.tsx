import { FC } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from 'hooks/useAuthContext'
import { ErrorResponse } from 'hooks/useAuthentication'
import { PATHS } from 'router/paths'
import { Box, Button, Container, Header, Spinner } from 'components'

import { ResultContent } from './ResultContent'
import * as S from './Result.styled'

export type ResultProps = {
  isLoading: boolean
  error: ErrorResponse | null
  isValid: boolean
  pathTo: string
}

const Result: FC<ResultProps> = ({ isLoading, isValid, error, pathTo }) => {
  const navigate = useNavigate()
  const { authState } = useAuthContext()

  if (authState.appFlow === null || authState.appFlow === 'holder') {
    navigate(PATHS.HOME)
  }

  if (isLoading) {
    return (
      <>
        <Header
          title={authState.appFlow === 'verifier' ? 'QR code scanned' : 'Ticket Issued'}
          hasBackIcon
        />
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }

  const isResultValid = isValid && !error

  return (
    <>
      <Header
        title={authState.appFlow === 'verifier' ? 'QR code scanned' : 'Ticket issued'}
        hasBackIcon
      />
      <Container>
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <Box className="lg:col-start-2" alignItems="center">
            <ResultContent isValid={isResultValid} isIssuance={authState.appFlow === 'issuer'} />
            <S.ResultPara variant="p1">
              {authState.appFlow === 'verifier'
                ? isResultValid
                  ? 'Ticket successfully checked.'
                  : 'Ticket is invalid'
                : 'Your ticket has been issued.'}
            </S.ResultPara>

            <Button fullWidth variant="outlined" onClick={() => navigate(pathTo)}>
              {authState.appFlow === 'verifier' ? 'SCAN NEXT QR CODE' : 'ISSUE NEXT TICKET'}
            </Button>
          </Box>
        </div>
      </Container>
    </>
  )
}

export default Result
