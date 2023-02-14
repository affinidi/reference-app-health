import { FC } from 'react'

import { Box, Typography } from 'components'

import * as S from './VcDetails.styled'

export type VcDetailsProps = {
  patientName: string
  medicationName: string
  date: string
  dosage: string
  frequency: string
  practitionerName: string
  qrCode: string
}

export const VcDetails: FC<VcDetailsProps> = ({
  patientName,
  medicationName,
  date,
  dosage,
  frequency,
  practitionerName,
  qrCode,
}) => (
  <S.VcDetailsContainer justifyContent='space-between' direction="row">
    <S.VcDetailsCard justifyContent='space-between' gap={48}>
      <Box gap={8}>
        <Typography variant='h4'>{patientName}</Typography>
      </Box>

      <S.MedicationDetailsContainer gap={42}>
        <Box gap={2}>
          <Typography variant='p3'>Medication</Typography>
          <Typography variant='p4'>{medicationName}</Typography>
        </Box>

        <div className='grid gap-8 lg:grid-cols-4'>
          <div className='grid lg:col-span-2 grid-cols-2 gap-8'>
            <Box gap={2}>
              <Typography variant='p3'>Dosage</Typography>
              <Typography variant='p4'>{dosage} </Typography>
            </Box>
            <Box gap={2}>
              <Typography variant='p3'>Frequency</Typography>
              <Typography variant='p4'>{frequency}</Typography>
            </Box>
          </div>

          <Box gap={2}>
            <Typography variant='p3'>Date</Typography>
            <Typography variant='p4'>{date}</Typography>
          </Box>

          <Box gap={2}>
            <Typography variant='p3'>Practitioner</Typography>
            <Typography variant='p4'>{practitionerName}</Typography>
          </Box>
        </div>
      </S.MedicationDetailsContainer>
    </S.VcDetailsCard>

    <S.QrCodeCard>
      <img src={qrCode} alt='QR Code' />
    </S.QrCodeCard>
  </S.VcDetailsContainer>
)

export default VcDetails
