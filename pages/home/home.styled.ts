import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Box } from 'components'

export const Wrapper = styled.div`
  padding-bottom: ${pxToRem(40)};
`

export const Card = styled(Box)`
  padding: ${pxToRem(24)};
  border-radius: 8px;
  box-shadow: 0 ${pxToRem(4)} ${pxToRem(20)} 0 rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.colors.neutral.secondary['100']};
  cursor: pointer;

  * {
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    padding: ${pxToRem(32)};
  }
`

export const Icon = styled.div`
  @media (min-width: 1024px) {
    width: ${pxToRem(48)};
    height: ${pxToRem(48)};
  }
`
