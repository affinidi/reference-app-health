import { Box, Typography } from 'components'
import ReactSelect from 'react-select'
import styled, { css } from 'styled-components'

import { pxToRem } from '../../utils'


export const Wrapper = styled(Box)`
  margin-bottom: ${pxToRem(24)};
`

const getTextColor = (props) => {
  if (props.$hasError) {
    return props.theme.colors.utility.danger['100']
  }

  if (props.$disabled) {
    return props.theme.colors.neutral.primary['30']
  }

  return ''
}

export const Label = styled(Typography)<{ $hasError?: boolean; $disabled?: boolean }>`
  color: ${getTextColor};
`

export const Select = styled(ReactSelect)<{ $hasError?: boolean }>`
  width: 100%;

  .select__value-container {
    padding-left: ${pxToRem(16)};
  }

  .select__single-value,
  .select__placeholder {
    margin: 0;
    font-weight: 500;
    font-size: ${pxToRem(16)};
    line-height: ${pxToRem(22)};
  }

  .select__single-value {
    color: ${({ theme }) => theme.colors.neutral.primary['90']};
  }

  .select__control--is-disabled {
    cursor: not-allowed;

    .select__placeholder {
      color: ${({ theme }) => theme.colors.neutral.primary['30']};
    }

    .select__single-value {
      color: ${({ theme }) => theme.colors.neutral.primary['50']};
    }

    .select__indicators path {
      fill: ${({ theme }) => theme.colors.neutral.primary['15']};
    }
  }

  .select__placeholder {
    color: ${({ theme }) => theme.colors.neutral.primary['50']};
  }

  .select__control {
    min-height: ${pxToRem(48)};
    border-radius: 4px;
    border-width: ${({ $hasError }) => ($hasError ? '2px' : '1px')};
    border-style: solid;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.utility.danger['100'] : theme.colors.neutral.primary['15']};
    background-color: transparent;
    box-shadow: none;
    cursor: pointer;
    transition: border-color 0.3s ease-out;

    &:hover {
      border-color: ${({ theme, $hasError }) =>
        $hasError ? theme.colors.utility.danger['100'] : theme.colors.brand.secondary['100']};
    }
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      .select__value-container {
        padding-left: ${pxToRem(15)};
      }

      .select__indicators {
        padding-right: ${pxToRem(15)};
      }
    `}

  .select__control--menu-is-open,
  .select__control--is-focused {
    border-width: 2px;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.utility.danger['100'] : theme.colors.brand.secondary['100']};

    .select__value-container {
      padding-left: ${pxToRem(15)};
    }

    .select__indicators {
      padding-right: ${pxToRem(15)};
    }
  }

  .select__control--menu-is-open {
    .select__indicators {
      transform: rotate(180deg) scaleX(-1);
    }
  }

  .select__indicator-separator {
    display: none;
  }

  .select__indicators {
    padding: 0 ${pxToRem(16)};

    ${({ theme, $hasError }) =>
      $hasError &&
      css`
        path {
          fill: ${theme.colors.utility.danger['100']};
        }
      `}
  }
`

export const Menu = styled.div`
  .select__menu {
    margin: ${pxToRem(4)} 0;
    box-shadow: none;
    border-radius: 4px;
    border: 2px solid ${({ theme }) => theme.colors.brand.secondary['100']};
  }

  .select__menu-list {
    padding: ${pxToRem(6)};
  }

  .select__option {
    padding: ${pxToRem(8)};
    background-color: transparent;
    transition: background-color 0.3s ease-out;
    cursor: pointer;

    &.select__option--is-selected,
    &.select__option--is-focused,
    &:hover {
      background: ${({ theme }) => theme.colors.brand.primary[5]};
      color: inherit;
    }
  }
`

export const HelpText = styled(Typography)<{ $hasError?: boolean; $disabled?: boolean }>`
  color: ${getTextColor};
`
