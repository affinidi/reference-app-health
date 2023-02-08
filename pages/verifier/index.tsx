import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { ROUTES } from 'utils'
import { Box, Button, Container, Header } from 'components'
import QrScan from 'public/images/illustration-qr-scan-default.svg'

import * as S from './Verifier.styled'

const Verifier: FC = () => {
  const router = useRouter()

  return (
    <>
      <Header title="Welcome" hasBackIcon />

      <Container>
        <div className="grid lg:grid-cols-3 lg:gap-16">
          <Box alignItems="center" className="lg:col-start-2">
            <Image src={QrScan} alt="QR Scan" />

            <S.WelcomeMessage align="center" variant="p1">
              Welcome to the healthi scanner. Tap “scan QR code” to start checking medical records.
            </S.WelcomeMessage>

            <Button fullWidth onClick={() => router.push(ROUTES.verifier.scan)}>SCAN QR CODE</Button>
          </Box>
        </div>
      </Container>
    </>
  )
}

export default Verifier
