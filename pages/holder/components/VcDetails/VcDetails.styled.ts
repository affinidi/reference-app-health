import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Box } from 'components'

export const QrCodeCard = styled(Box)`
  img {
    border-radius: 16px;

    @media (min-width: 1024px) {
      padding-left: ${pxToRem(30)};

      height: ${pxToRem(248)};
      max-width: none;
    }
  }

  @media (max-width: 1024px) {
    margin-bottom: ${pxToRem(40)};

    img {
      height: ${pxToRem(292)};
    }
  }
`

export const VcDetailsContainer = styled(Box)`
  flex-direction: row;
  padding: ${pxToRem(40)};
  background-color: ${(props) => props.theme.colors.brand.secondary['50']};

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
  }

  @media (min-width: 1024px) {
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
  }
`

export const VcDetailsCard = styled(Box)`
  gap: ${pxToRem(48)};
  width: 100%;

  span {
    word-wrap: break-word;
  }

  @media (max-width: 1024px) {
    gap: ${pxToRem(36)};
  }
`

export const MedicationDetailsContainer = styled(Box)`
  gap: ${pxToRem(42)};

  @media (max-width: 1024px) {
    gap: ${pxToRem(26)};
  }
`
