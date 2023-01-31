import styled from 'styled-components'

import { pxToRem } from 'utils'

import Box from '../Box/Box'
import Typography from '../Typography/Typography'

export const IconWrapper = styled.div`
  margin-bottom: ${pxToRem(36)};
  cursor: pointer;

  path {
    fill: ${(props) => props.theme.colors.neutral.primary['100']};
  }
`

export const Container = styled(Box)`
  position: relative;
  height: ${pxToRem(144)};
`

export const Title = styled(Typography)`
  padding-bottom: ${pxToRem(20)};
  color: #313a55;
`
