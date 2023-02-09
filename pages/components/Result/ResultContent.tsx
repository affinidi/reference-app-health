import { FC } from 'react'
import Image from 'next/image'

import IssuedIcon from 'public/images/illustration-doctor.svg'
import QrScanSuccess from 'public/images/illustration-qr-scan-success.svg'
import QrScanError from 'public/images/illustration-qr-scan-error.svg'

import * as S from './Result.styled'

export type ResultContentProps = {
  isValid: boolean
  isIssuance?: boolean
}

export const ResultContent: FC<ResultContentProps> = ({ isValid, isIssuance }) => (
  <>
    <S.ImgWrapper>
      {isValid ? isIssuance ?
          <Image
            src={IssuedIcon}
            alt="Prescription successfully issued"
          /> :
          <Image
            src={QrScanSuccess}
            alt="Valid prescription"
          /> :
        <Image
          src={QrScanError}
          alt="Invalid prescription"
        />
      }
    </S.ImgWrapper>

    <S.ResultTitle
      variant="h5"
      $isVerified={isValid}
      $isIssuance={isIssuance}
    >
      {isValid ? (isIssuance ? 'Prescription successfully issued' : 'Valid prescription') : 'Invalid prescription'}
    </S.ResultTitle>
  </>
)
