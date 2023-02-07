import { FC } from 'react'
import { useRouter } from 'next/router'

import { ErrorResponse } from 'hooks/useAuthentication'
import { Box, Button, Container, Header, Spinner } from 'components'

import { ResultContent } from './ResultContent'
import * as S from './Result.styled'

export type ResultProps = {
  isLoading?: boolean
  error?: ErrorResponse | null
  isValid: boolean
  pathTo: string
}

export const Result: FC<ResultProps> = ({ isLoading = false, isValid, error = null, pathTo }) => {
  const router = useRouter()

  const isVerifier = router.route.includes('/verifier')

  if (isLoading) {
    return (
      <>
        <Header
          title={isVerifier ? 'QR code scanned' : 'Ticket Issued'}
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
        title={isVerifier ? 'QR code scanned' : 'Ticket issued'}
        hasBackIcon
      />
      <Container>
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <Box className="lg:col-start-2" alignItems="center">
            <ResultContent isValid={isResultValid} isIssuance={!isVerifier} />
            <S.ResultPara variant="p1">
              {isVerifier
                ? isResultValid
                  ? 'Ticket successfully checked.'
                  : 'Ticket is invalid'
                : 'Your ticket has been issued.'}
            </S.ResultPara>

            <Button
              fullWidth
              color="quaternary"
              variant="outlined"
              onClick={() => router.push(pathTo)}
            >
              {isVerifier ? 'SCAN NEXT QR CODE' : 'ISSUE NEXT TICKET'}
            </Button>
          </Box>
        </div>
      </Container>
    </>
  )
}
