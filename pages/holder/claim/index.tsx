import { FC, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { Container, Header, Spinner } from 'components'
import { useHolderApi } from 'hooks/holder/useHolderApi'
import { useAuthContext } from 'hooks/useAuthContext'

const ClaimVc: FC = () => {
  const { push } = useRouter()
  const { authState, updateAuthState } = useAuthContext()

  const searchParams = useSearchParams()
  const credentialOfferRequestToken = searchParams.get('credentialOfferRequestToken') || authState.vcOfferToken

  const { useClaimVcQuery } = useHolderApi()
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
  }, [credentialOfferRequestToken, updateAuthState, data, error, push])

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
