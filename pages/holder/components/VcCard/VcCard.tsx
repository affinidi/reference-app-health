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
  isValid: boolean
}

const VcCard: FC<VcCardProps> = ({ credential, isValid }) => {
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
          <Typography variant='c1'>Prescription Record 1</Typography>
          <Typography variant='p4'>{credential.medicationName}</Typography>
        </Box>
      </Box>
    </S.VcCard>
  )
}

export default VcCard
