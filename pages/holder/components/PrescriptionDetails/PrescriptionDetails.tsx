import { FC } from 'react'

import { Box, Typography } from 'components'

import * as S from './PrescriptionDetails.styled'

export type PrescriptionDetailsProps = {
  patientName: string
  medicationName: string
  date: string
  dosage: string
  frequency: string
  practitionerName: string
  qrCode: string
}

export const PrescriptionDetails: FC<PrescriptionDetailsProps> = ({
  patientName,
  medicationName,
  date,
  dosage,
  frequency,
  practitionerName,
  qrCode,
}) => (
  <S.PrescriptionDetailsCard justifyContent='space-between'>
    <Box>
      <S.DataCardInnerContainer justifyContent='space-between'>
          <Box gap={8}>
            <Typography variant='h4'>{patientName}</Typography>
            <Typography variant='s1'>Prescription Record</Typography>
          </Box>

        <S.MedicationDetailsContainer>
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
                <Typography variant='p4'>{frequency} </Typography>
              </Box>
            </div>

            <Box gap={2}>
              <Typography variant='p3'>Date</Typography>
              <Typography variant='p4'>{date} </Typography>
            </Box>

            <Box gap={2}>
              <Typography variant='p3'>Practitioner</Typography>
              <Typography variant='p4'>{practitionerName} </Typography>
            </Box>
          </div>
        </S.MedicationDetailsContainer>
      </S.DataCardInnerContainer>
    </Box>

    <S.QrCodeCard>
      <img src={qrCode} alt='QR Code' />
    </S.QrCodeCard>
    {/* </div> */}
  </S.PrescriptionDetailsCard>
)

export default PrescriptionDetails
