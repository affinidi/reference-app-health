import { FC } from 'react'
import { format } from 'date-fns'

import { AnyData } from 'services/cloud-wallet/cloud-wallet.api'

import { VcDetails } from '../VcDetails/VcDetails'

import * as S from './Credential.styled'

export type CredentialProps = {
  credentialSubject: AnyData
  qrCode?: string
}

export const renderLiteral = (value: unknown): string => {
  if (typeof value !== 'string') {
    return `${value}`
  }

  const parsedDate = Date.parse(value)
  if (!parsedDate) {
    return value
  }

  const d = new Date(parsedDate)
  return d.toDateString()
}

const getDetails = ({
  detailsObject,
  nested = false,
  qrCode,
}: {
  detailsObject: unknown
  nested?: boolean
  qrCode?: string
}) => {
  if (Array.isArray(detailsObject)) {
    return (
      <S.Div nested={nested}>
        {detailsObject.map((value, index) => (
          <S.Div key={index}>
            {getDetails({ detailsObject: value, nested: true })}
          </S.Div>
        ))}
      </S.Div>
    )
  }

  if (typeof detailsObject === 'object' && detailsObject !== null) {
    return (
      qrCode && (
        <VcDetails
          medicationName={detailsObject.medicationName}
          patientName={detailsObject.patient.name}
          date={format(new Date(detailsObject.prescribedAt), 'dd/MM/yyyy')}
          dosage={`${detailsObject.dosage.amount} ${detailsObject.dosage.unit}`}
          frequency={`${detailsObject.frequency.amount} per ${detailsObject.frequency.interval.unit}`}
          practitionerName={detailsObject.practitioner.name}
          qrCode={qrCode}
        />
      )
    )
  }

  return <S.Div>{renderLiteral(detailsObject)}</S.Div>
}

export const Credential: FC<CredentialProps> = ({
  credentialSubject,
  qrCode,
}) => {
  return <>{getDetails({ detailsObject: credentialSubject, qrCode })}</>
}
