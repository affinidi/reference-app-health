import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { useAuthContext } from 'hooks/useAuthContext'
import { useLogOutMutation } from 'hooks/holder/api'
import { useSessionStorage } from '../../../hooks/useSessionStorage'

export const useNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { authState, updateAuthState } = useAuthContext()
  const { clear } = useSessionStorage()
  const { mutateAsync } = useLogOutMutation()
  const { push } = useRouter()

  const isAuthorized = authState.authorizedAsIssuer || authState.authorizedAsHolder

  const handleGoHomePage = () => {
    push(ROUTES.home)
  }

  const handleLogOut = useCallback(async () => {
    await mutateAsync()
    clear()
    
    updateAuthState({
      authorizedAsIssuer: false,
      authorizedAsHolder: false,
    })
    setIsMenuOpen(false)
    push(ROUTES.home)
  }, [authState, push, updateAuthState])

  return { isMenuOpen, handleLogOut, setIsMenuOpen, handleGoHomePage, isAuthorized }
}
