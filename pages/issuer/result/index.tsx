import { FC } from 'react'

import { ROUTES } from 'utils'
import { useAuthContext } from 'hooks/useAuthContext'
import { Spinner } from 'components'

import { Result } from '../../components/Result/Result'

const IssuanceResult: FC = () => {
  const { authState } = useAuthContext()

  if (!authState.authorizedAsIssuer) {
    return <Spinner />
  }

  return <Result isValid={true} pathTo={ROUTES.issuer.credentialForm} />
}

export default IssuanceResult;
