import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Box } from 'components'

export const VcCard = styled(Box)`
  height: ${pxToRem(72)};
  padding: ${pxToRem(12)};
  box-shadow: 0 4px 20px 0 rgba(49, 58, 85, 0.1);
  border-radius: 8px;
  cursor: pointer;

  * {
    cursor: pointer;
  }
`

export const ImageWrapper = styled(Box)`
  width: ${pxToRem(48)};
  height: ${pxToRem(48)};
  border-radius: 50%;
  background: ${(props) => props.theme.colors.brand.secondary['50']};
`
