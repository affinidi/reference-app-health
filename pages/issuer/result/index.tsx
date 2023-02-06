import { FC } from 'react'
import { useRouter } from 'next/router';

import { ROUTES } from 'utils'
import { useAuthContext } from 'hooks/useAuthContext'

import { Result } from "./components/Result";

const IssuanceResult: FC = () => {
  const router = useRouter()
  const { authState, updateAuthState } = useAuthContext()

  const pathTo = ROUTES.issuer.credentialForm

  if (authState.appFlow !== 'issuer') {
    updateAuthState({ appFlow: null })
    router.push(ROUTES.home)
  }

  return <Result isLoading={false} error={null} isValid={true} pathTo={pathTo} />
}

export default IssuanceResult;