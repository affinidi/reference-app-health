import { FC, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRouter } from 'next/router'
import { useAuthContext } from 'hooks/useAuthContext'
import { Container, Header, Spinner } from 'components'
import { useClaimCredentialQuery } from '../hooks/useCredentials'
import { ROUTES } from 'utils'

export const ClaimVc: FC = () => {
  const { authState, updateAuthState } = useAuthContext()
  const navigate = useRouter()

  const credentialOfferRequestToken = navigate.query.credentialOfferRequestToken

  const { data, refetch } = useClaimCredentialQuery(authState.vcOfferToken)

  useEffect(() => {
    if (credentialOfferRequestToken !== null) {
      updateAuthState({ vcOfferToken: credentialOfferRequestToken as string })
    }
    if (!authState.authorizedAsHolder) {
      // navigate.push(ROUTES.holder.signIn)
    }
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  useEffect(() => {
    if (data)
      navigate.push(`${ROUTES.holder.credential}/${data.credentialIds[0]}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <Header title='Claim credential' />
      <Container>
        <Spinner />
      </Container>
    </>
  )
}

export default ClaimVc
