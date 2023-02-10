import styled from 'styled-components'

import { Box } from 'components'
import { pxToRem } from 'utils'

export const ContainerWrapper = styled(Box)`
  padding: 0 ${pxToRem(100)};

  @media (max-width: 1024px) {
    padding: 0;
  }
`
