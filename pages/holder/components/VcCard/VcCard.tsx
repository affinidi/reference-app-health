import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { ROUTES } from 'utils'
import { Credential } from 'pages/holder/types'
import PrescriptionIcon from 'public/images/icon-prescription.svg'
import { Box, Typography } from 'components'

import * as S from './VcCard.styled'

export type VcCardProps = {
  credential: Credential
}

const VcCard: FC<VcCardProps> = ({ credential }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`${ROUTES.holder.credential}/${credential.credentialId}`)
  }

  return (
    <S.VcCard direction='row' gap={12} onClick={handleClick}>
      <S.ImageWrapper justifyContent='center' alignItems='center'>
        <Image src={PrescriptionIcon} alt='Prescription' />
      </S.ImageWrapper>

      <Box direction='row' gap={4}>
        <Box>
          <Typography variant='h7'>{credential.title}</Typography>
          <Typography variant='p3'>{credential.medicationName}</Typography>
        </Box>
      </Box>
    </S.VcCard>
  )
}

export default VcCard
