import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import BackIcon from 'public/images/icon-back.svg'

import Container from '../Container/Container'

import * as S from './Header.styled'

export type HeaderProps = {
  title: string
  hasBackIcon?: boolean
  path?: string
  hideForMobile?: boolean
}

const Header: FC<HeaderProps> = ({
  title,
  hasBackIcon,
  path,
  hideForMobile,
}) => {
  const navigate = useRouter()

  return (
    <Container>
      <S.Container justifyContent='flex-end'>
        {hasBackIcon && (
          <S.IconWrapper
            onClick={() =>
              path ? navigate.push(path) : hasBackIcon ? navigate.back() : null
            }
          >
            <Image src={BackIcon} alt='Go back' />
          </S.IconWrapper>
        )}
         <S.VisibilityWrapper $hideForMobile={hideForMobile}>
            <S.Title variant='h4'>{title}</S.Title>
          </S.VisibilityWrapper>
      </S.Container>
    </Container>
  )
}

export default Header
