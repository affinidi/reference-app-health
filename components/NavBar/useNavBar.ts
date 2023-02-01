import { useCallback, useState } from "react";

import { useAuthContext } from "hooks/useAuthContext";
import { logout } from "hooks/useAuthentication";
import { ROUTES } from "utils";
import { useRouter } from "next/router";

export const useNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authState, updateAuthState } = useAuthContext();
  const router = useRouter();

  const isAuthorized =
    authState.authorizedAsIssuer || authState.authorizedAsHolder;

  const handleLogOut = useCallback(async () => {
    await logout(authState);
    updateAuthState({
      authorizedAsIssuer: false,
      authorizedAsHolder: false,
    });
    setIsMenuOpen(false);
    router.push(ROUTES.home);
  }, [authState, router, updateAuthState]);

  return { isMenuOpen, handleLogOut, setIsMenuOpen, router, isAuthorized };
};
