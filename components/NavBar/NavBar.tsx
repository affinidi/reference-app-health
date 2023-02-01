import { FC } from "react";

import { Typography } from "components";
import { ROUTES } from "utils";
import eventiLogoIcon from "../../assets/svg/eventi-logo-icon.svg";
import iconClose from "../../assets/svg/icon-close.svg";
import iconOpen from "../../assets/svg/icon-menu.svg";

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
          src={eventiLogoIcon.src}
          aria-label="wallet-logo"
        />

        {isAuthorized && (
          <div>
            {isMenuOpen ? (
              <S.Icon
                aria-label="menu-close-icon"
                onClick={() => setIsMenuOpen(false)}
                src={iconClose.src}
              />
            ) : (
              <S.Icon
                aria-label="menu-open-icon"
                onClick={() => setIsMenuOpen(true)}
                src={iconOpen.src}
              />
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
