import { FC } from 'react'

import Logo from 'public/images/logo.svg'
import CloseIcon from 'public/images/icon-close.svg'
import MenuIcon from 'public/images/icon-menu.svg'
import { Container, Modal, Typography } from 'components'

import { useNavBar } from './useNavBar'
import * as S from './NavBar.styled'
import Image from 'next/image'

const NavBar: FC = () => {
  const { isMenuOpen, setIsMenuOpen, handleLogOut, handleGoHomePage, isAuthorized } = useNavBar()

  return (
    <>
      <Container>
        <S.Container justifyContent="space-between" alignItems="center" direction="row">
          <S.Logo>
            <Image onClick={handleGoHomePage} src={Logo} alt="healthi" aria-label="app-logo" />
          </S.Logo>

          {isAuthorized && (
            <>
              {isMenuOpen ? (
                <S.IconWrapper>
                  <Image src={CloseIcon} alt="Close menu" onClick={() => setIsMenuOpen(false)} aria-label="menu-close-icon" />
                </S.IconWrapper>
              ) : (
                <S.IconWrapper>
                  <Image src={MenuIcon} alt="Open menu" onClick={() => setIsMenuOpen(true)} aria-label="menu-open-icon" />
                </S.IconWrapper>
              )}
            </>
          )}
        </S.Container>
      </Container>

      {isAuthorized && (
        <Modal open={isMenuOpen} onClose={() => setIsMenuOpen(false)} position="rightSide">
          <S.Content alignItems="flex-end">
            <S.ButtonContainer onClick={handleLogOut}>
              <Typography variant="b1">Log out</Typography>
            </S.ButtonContainer>
          </S.Content>
        </Modal>
      )}
    </>
  )
}

export default NavBar
