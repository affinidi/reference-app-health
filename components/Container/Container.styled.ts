import styled from 'styled-components'

import { pxToRem } from 'utils'

export const Container = styled.div`
  padding: 0 ${pxToRem(100)};

  @media (max-width: 1024px) {
    padding: 0 ${pxToRem(24)};
  }
`

export const Title = styled.div`
  padding: ${pxToRem(24)} ${pxToRem(100)} 0;

  @media (max-width: 1024px) {
    padding: ${pxToRem(24)} ${pxToRem(24)} 0;
  }
`
