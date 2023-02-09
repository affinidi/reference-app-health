import React from 'react'
import { Props, components } from 'react-select'
import Image from 'next/image'

import { Typography } from 'components'
import ChevronDownIcon from 'public/images/icon-chevron-down.svg'

import * as S from './Select.styled'

export type Option<TValue extends string | number> = {
  value: TValue
  label: string
}

export type SelectProps<
  TOption extends Option<string | number> | unknown =
    | Option<string | number>
    | unknown
> = {
  label?: string
  hasError?: boolean
  helpText?: string
} & Props<TOption>

export const Select = ({
  isSearchable = false,
  menuPortalTarget = document.body,
  label,
  className,
  hasError,
  helpText,
  isDisabled,
  classNamePrefix = 'select',
  placeholder = 'Select option',
  ...props
}: SelectProps) => (
  <S.Wrapper direction='column' gap={4} className={className}>
    {label && (
      <S.Label variant='p4' $hasError={hasError} $disabled={isDisabled}>
        {label}
      </S.Label>
    )}

    <S.Select
      {...props}
      $hasError={hasError}
      placeholder={placeholder}
      classNamePrefix={classNamePrefix}
      isDisabled={isDisabled}
      isSearchable={isSearchable}
      menuPortalTarget={menuPortalTarget}
      components={{
        DropdownIndicator: () => <Image src={ChevronDownIcon} alt='Loading' />,
        Menu: (menuProps) => (
          <S.Menu>
            <components.Menu {...menuProps} />
          </S.Menu>
        ),
        Option: (optionProps) => (
          <Typography variant='p1' tag='div'>
            <components.Option {...optionProps} />
          </Typography>
        ),
        ...props.components,
      }}
    />

    {helpText && (
      <S.HelpText variant='p3' $hasError={hasError} $disabled={isDisabled}>
        {helpText}
      </S.HelpText>
    )}
  </S.Wrapper>
)

export default Select
