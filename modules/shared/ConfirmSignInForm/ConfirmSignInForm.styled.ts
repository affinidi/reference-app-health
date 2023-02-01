import styled from 'styled-components'

import { Box, Input, Typography } from 'components'
import { InputProps } from 'components/Input/Input'
import { pxToRem } from 'utils'

export const Message = styled(Typography)`
  span {
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
  }
`

export const Label = styled(Typography)<{ $error: boolean }>`
  ${(props) => (props.$error ? `color: #e73c5b` : null)};
`

export const VerificationFieldContainer = styled(Box)`
  @media (max-width: 1024px) {
    gap: ${pxToRem(16)};
  }
`

export const VerificationField = styled(Input)<InputProps>`
  margin: ${pxToRem(10)} ${pxToRem(10)} ${pxToRem(10)} 0;

  input {
    text-align: center;
    padding: ${pxToRem(4)} ${pxToRem(8)};
    border-radius: ${pxToRem(8)};
    font-family: Montserrat;
    font-size: ${pxToRem(28)};
    font-weight: bold;
    line-height: 1.29;
    letter-spacing: ${pxToRem(0.2)};
    color: #464e66;
    background: #f8f8f9;
  }
`
