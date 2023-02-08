import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { ROUTES } from 'utils'
import { Credential } from 'pages/holder/types'
import PrescriptionIcon from 'public/images/icon-prescription.svg'
import { Box, Typography } from 'components'

import * as S from './PrescriptionCard.styled'

export type PrescriptionCardProps = {
  credential: Credential
  isValid: boolean
}

const PrescriptionCard: FC<PrescriptionCardProps> = ({ credential, isValid }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`${ROUTES.holder.credential}/${credential.credentialId}`)
  }

  return (
    <S.Prescription
      direction="row"
      gap={12}
      onClick={handleClick}
    >
      <S.ImageWrapper
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={PrescriptionIcon}
          alt="Prescription"
        />
      </S.ImageWrapper>

      <Box
        direction="row"
        gap={4}
      >
        <Box>
          <Typography variant="c1">Start Date</Typography>
          <Typography variant="p4">{credential.date}</Typography>
        </Box>
        <Box>
          <Typography variant="c1">Start Time</Typography>
          <Typography variant="p4">{credential.time}</Typography>
        </Box>
      </Box>
    </S.Prescription>
  )
}

export default PrescriptionCard
