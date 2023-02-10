import { FC, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { Container, Header, Spinner } from 'components'
import { useClaimVcQuery } from 'hooks/holder/api'
import { useAuthContext } from 'hooks/useAuthContext'

const ClaimVc: FC = () => {
  const { push } = useRouter()
  const { authState, updateAuthState } = useAuthContext()
  const searchParams = useSearchParams()
  const credentialOfferRequestToken = searchParams.get('credentialOfferRequestToken') || authState.vcOfferToken
  const { data, error } = useClaimVcQuery({ credentialOfferRequestToken })

  useEffect(() => {
    if (credentialOfferRequestToken) {
      updateAuthState({ vcOfferToken: credentialOfferRequestToken })
    }

    if (data?.credentialId) {
      updateAuthState({ vcOfferToken: undefined })
      push(`${ROUTES.holder.credential}/${data.credentialId}`)
    }

    if (error) {
      // TODO: show error
      push(ROUTES.holder.home)
    }
  }, [credentialOfferRequestToken,, data, error])

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
