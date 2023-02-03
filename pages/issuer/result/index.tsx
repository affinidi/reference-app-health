import { FC } from 'react'
import { ROUTES } from 'utils'
import { useAuthContext } from 'hooks/useAuthContext'
import { Result } from "./components/Result";
import { useRouter } from 'next/router';

const IssuanceResult: FC = () => {
  const router = useRouter()
  const { authState, updateAuthState } = useAuthContext()

  const isLoading = false
  const error = null
  const isValid = true
  const pathTo = ROUTES.issuer.credentialForm

  if (authState.appFlow !== 'issuer') {
    updateAuthState({ appFlow: null })
    router.push(ROUTES.home)
  }

  return <Result isLoading={isLoading} error={error} isValid={isValid} pathTo={pathTo} />
}

export default IssuanceResult;