import { FC, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { useAuthContext } from 'hooks/useAuthContext'
import { useClaimCredentialQuery } from 'hooks/holder/useCredentials'
import { Container, Header, Spinner } from 'components'

const ClaimVc: FC = () => {
  const { authState, updateAuthState } = useAuthContext()
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const credentialOfferRequestToken = searchParams.get('credentialOfferRequestToken')
  const { data, refetch } = useClaimCredentialQuery(authState.vcOfferToken)

  useEffect(() => {
    if (credentialOfferRequestToken !== null) {
      updateAuthState({ vcOfferToken: credentialOfferRequestToken as string })
    }

    refetch()
  }, [push, refetch, searchParams, credentialOfferRequestToken])

  useEffect(() => {
    if (data) {
      push(`${ROUTES.holder.credential}/${data.credentialIds[0]}`)
    }
  }, [data, push])

  return (
    <>
      <Header title="Claim credential" />
      <Container>
        <Spinner />
      </Container>
    </>
  )
}

export default ClaimVc
