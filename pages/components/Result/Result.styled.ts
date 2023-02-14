import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Button, Typography } from 'components'

export const ResultTitle = styled(Typography)<{
  $isVerified?: boolean
  $isIssuance?: boolean
}>`
  white-space: nowrap;
  color: ${(props) =>
    props.$isIssuance || props.$isVerified
      ? props.theme.colors.utility.success[70]
      : props.theme.colors.utility.danger[70]};
  margin: ${pxToRem(48)} 0 ${pxToRem(16)};

  @media (max-width: 1024px) {
    margin: ${pxToRem(64)} 0 ${pxToRem(8)};
    white-space: normal;
  }
`

export const ResultPara = styled(Typography)`
  margin-bottom: ${pxToRem(48)};

  @media (max-width: 1024px) {
    margin-bottom: ${pxToRem(58)};
  }
`

export const ImgWrapper = styled.div`
  svg {
    max-width: 100%;
    height: auto;
  }
`

export const IssueButton = styled(Button)`
  margin-bottom: ${pxToRem(40)};
`
