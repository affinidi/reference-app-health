import styled from 'styled-components'

import { pxToRem } from 'utils'
import { Box } from 'components'

export const Container = styled(Box)`
  padding: 0 ${pxToRem(100)};
  
  @media (max-width: 576px) {
    padding: 0;
  }
`
