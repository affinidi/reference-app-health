import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { ROUTES } from 'utils'
import WalletIcon from 'public/images/icon-wallet.svg'
import DigitalCheckIcon from 'public/images/icon-digital-check.svg'
import BulkIssuanceIcon from 'public/images/icon-bulk-issuance.svg'
import { Box, Container, Header, Typography } from 'components'

import * as S from './home.styled'

export const Home: FC = () => {
  const router = useRouter()

  return (
    <>
      <Header title="Home" />

      <Container title="Please select one of the following options">
        <S.Wrapper className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <S.Card
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            gap={8}
            onClick={() => router.push(ROUTES.holder.home)}
          >
            <Box gap={16}>
              <Typography variant="h6">Collect medical records</Typography>
              <Typography variant="p1">
                Collect your medical records or view them stored in your wallet
              </Typography>
            </Box>
            <S.Icon>
              <Image
                src={WalletIcon}
                alt="Wallet"
              />
            </S.Icon>
          </S.Card>

          <S.Card
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            gap={8}
            onClick={() => router.push(ROUTES.verifier.welcome)}
          >
            <Box gap={16}>
              <Typography variant="h6">Verify medical records</Typography>
              <Typography variant="p1">
                Verify medical records with a QR code scanner
              </Typography>
            </Box>
            <S.Icon>
              <Image
                src={DigitalCheckIcon}
                alt="Check"
              />
            </S.Icon>
          </S.Card>

          <S.Card
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            gap={8}
            onClick={() => router.push(ROUTES.issuer.credentialForm)}
          >
            <Box gap={16}>
              <Typography variant="h6">Issue medical records</Typography>
              <Typography variant="p1">
                Issue medical records to your patients easily
              </Typography>
            </Box>
            <S.Icon>
              <Image
                src={BulkIssuanceIcon}
                alt="Bulk Issuance"
              />
            </S.Icon>
          </S.Card>
        </S.Wrapper>
      </Container>
    </>
  )
}
export default Home
