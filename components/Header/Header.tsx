import { FC } from 'react'

import { BackIcon } from 'assets'

import Container from '../Container/Container'

import * as S from './Header.styled'
import { useRouter } from 'next/router'

export type HeaderProps = {
  title: string
  hasBackIcon?: boolean
  path?: string
}

const Header: FC<HeaderProps> = ({ title, hasBackIcon, path }) => {
  const router = useRouter()

  return (
    <Container>
      <S.Container justifyContent="flex-end">
        {hasBackIcon && (
          <S.IconWrapper
            onClick={() => (path ? router.push(path) : hasBackIcon ? router.back() : null)}
          >
            <BackIcon />
          </S.IconWrapper>
        )}

        <S.Title variant="h4">{title}</S.Title>
      </S.Container>
    </Container>
  )
}

export default Header
