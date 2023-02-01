import { FC } from "react";

import { Typography } from "components";
import { ROUTES } from "utils";
import { HealthiLogoIcon, IconClose, IconOpen } from "assets";

import { useNavBar } from "./useNavBar";

import * as S from "./NavBar.styled";

const NavBar: FC = () => {
  const { isMenuOpen, setIsMenuOpen, handleLogOut, router, isAuthorized } =
    useNavBar();

  return (
    <>
      <S.Container>
        <S.Logo
          onClick={() => router.push(ROUTES.home)}
          aria-label="wallet-logo"
        >
          <HealthiLogoIcon />
        </S.Logo>

        {isAuthorized && (
          <div>
            {isMenuOpen ? (
              <S.Icon
                aria-label="menu-close-icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <IconClose />
              </S.Icon>
            ) : (
              <S.Icon
                aria-label="menu-open-icon"
                onClick={() => setIsMenuOpen(true)}
              >
                <IconOpen />
              </S.Icon>
            )}
          </div>
        )}
      </S.Container>
      {isAuthorized && isMenuOpen && (
        <S.NavBar $isMenuOpen={isMenuOpen}>
          <S.MenuContainer $isOpen={isMenuOpen}>
            <S.ButtonContainer
              onClick={() => {
                setIsMenuOpen(false);
                router.push(ROUTES.home);
              }}
            >
              <Typography variant="b1">HOME</Typography>
            </S.ButtonContainer>
            <S.ButtonContainer onClick={() => handleLogOut()}>
              <Typography variant="b1">LOG OUT</Typography>
            </S.ButtonContainer>
          </S.MenuContainer>
        </S.NavBar>
      )}
    </>
  );
};

export default NavBar;
