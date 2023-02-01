import styled from "styled-components";
import { pxToRem } from "utils";

export const NavBar = styled.div<{ $isMenuOpen: boolean }>`
  position: fixed;
  top: ${pxToRem(64)};
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 50;
  background-color: ${(props) =>
    props.$isMenuOpen ? `rgba(6, 15, 95, 0.5)` : `none`};

  @media (min-width: 1024px) {
    padding: ${pxToRem(108)} ${pxToRem(100)};
  }
`;

export const Container = styled.div`
  padding: ${pxToRem(20)} ${pxToRem(24)};
  height: ${pxToRem(64)};
  text-align: right;
  position: relative;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: start;

  @media (min-width: 1024px) {
    padding: ${pxToRem(22)} ${pxToRem(100)};
    height: ${pxToRem(72)};
  }
`;

export const MenuContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: ${pxToRem(64)};
  right: 0;
  height: 100vh;
  width: ${pxToRem(524)};
  z-index: 100;
  background: #0e1533;
  padding: ${pxToRem(40)} ${pxToRem(24)};
  text-align: right;
  transform: ${(props) =>
    props.$isOpen
      ? `translateX(${pxToRem(0)})`
      : `translateX(${pxToRem(524)})`};

  @media (min-width: 1024px) {
    padding: ${pxToRem(108)} ${pxToRem(100)};
  }
`;

export const ButtonContainer = styled.div`
  cursor: pointer;
  margin-bottom: ${pxToRem(24)};
`;
export const Logo = styled.div`
  cursor: pointer;
  width: ${pxToRem(100)};
  height: ${pxToRem(24)};
  @media (min-width: 1024px) {
    width: ${pxToRem(139)};
    height: ${pxToRem(32)};
  }
`;
export const Icon = styled.div`
  cursor: pointer;
  width: ${pxToRem(24)};
  height: ${pxToRem(24)};
  @media (min-width: 1024px) {
    width: ${pxToRem(32)};
    height: ${pxToRem(32)};
  }
`;
