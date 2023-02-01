import { useCallback, useState } from "react";
import { useRouter } from "next/router";

import { useAuthContext } from "hooks/useAuthContext";
import { logout } from "hooks/useAuthentication";
import { ROUTES } from "utils";

export const useNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authState, updateAuthState } = useAuthContext();
  const navigate = useRouter();

  const isAuthorized =
    authState?.authorizedAsIssuer || authState?.authorizedAsHolder;

  const handleLogOut = useCallback(async () => {
    await logout(authState);
    updateAuthState({
      authorizedAsIssuer: false,
      authorizedAsHolder: false,
    });
    setIsMenuOpen(false);
    navigate.push(ROUTES.home);
  }, [authState, navigate, updateAuthState]);

  return { isMenuOpen, handleLogOut, setIsMenuOpen, navigate, isAuthorized };
};
