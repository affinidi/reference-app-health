import { FC } from 'react'

import { Box, Typography } from 'components'

import * as S from './PrescriptionDetails.styled'

export type PrescriptionDetailsProps = {
  eventName: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  qrCode: string
  location: string
}

export const PrescriptionDetails: FC<PrescriptionDetailsProps> = ({
  eventName,
  startDate,
  startTime,
  endDate,
  endTime,
  location,
  qrCode,
}) => (
  <S.PrescriptionDetailsCard>
    <S.DataCard>
      <Box
        justifyContent="space-between"
        gap={24}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <Box>
            <Typography variant="c1">Start Date</Typography>
            <Typography variant="p4">{startDate} </Typography>
          </Box>
          <Box>
            <Typography variant="c1">End Date</Typography>
            <Typography variant="p4">{endDate} </Typography>
          </Box>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <Box alignItems="start">
            <Typography variant="c1">Start Time</Typography>
            <Typography variant="p4">{startTime} </Typography>
          </Box>
          <Box>
            <Typography variant="c1">End Time</Typography>
            <Typography variant="p4">{endTime} </Typography>
          </Box>
        </div>

        <div className="grid">
          <Typography variant="c1">Location</Typography>
          <Typography variant="p4">{location} </Typography>
        </div>

        <Box>
          <Typography variant="p1">
            This is your event prescription for {eventName}. This prescription will be scanned upon entry. This
            QR code can only be used one time.
          </Typography>
        </Box>
      </Box>
    </S.DataCard>

    <S.QrCodeCard>
      <img
        src={qrCode}
        alt="QR Code"
      />
    </S.QrCodeCard>
  </S.PrescriptionDetailsCard>
)

export default PrescriptionDetails
