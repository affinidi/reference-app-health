import { FC } from 'react'
import { ROUTES } from 'utils'
import { useNavigate } from 'react-router'
import { useAuthContext } from 'hooks/useAuthContext'
import { Result } from 'components'

export const IssuanceResult: FC = () => {
  const navigate = useNavigate()
  const { authState, updateAuthState } = useAuthContext()

  const isLoading = false
  const error = null
  const isValid = true
  const pathTo = ROUTES.issuer.credential_form

  if (authState.appFlow !== 'issuer') {
    updateAuthState({ appFlow: null })
    navigate(ROUTES.home)
  }

  return <Result isLoading={isLoading} error={error} isValid={isValid} pathTo={pathTo} />
}
