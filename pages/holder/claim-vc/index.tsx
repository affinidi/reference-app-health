import { FC, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthContext } from 'hooks/useAuthContext'
import { useClaimCredentialQuery } from 'hooks/holder/useCredentials'
import { Container, Header, Spinner } from 'components'
import { ROUTES } from 'utils'

export const ClaimVc: FC = () => {
  const { authState, updateAuthState } = useAuthContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const credentialOfferRequestToken = searchParams.get('credentialOfferRequestToken')
  const { data, refetch } = useClaimCredentialQuery(authState.vcOfferToken)

  useEffect(() => {
    if (credentialOfferRequestToken !== null) {
      updateAuthState({ vcOfferToken: credentialOfferRequestToken as string })
    }
    if (!authState.authorizedAsHolder) {
      navigate(ROUTES.holder.signIn)
    }
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  useEffect(() => {
    if (data) navigate(`${ROUTES.holder.credential}/${data.credentialIds[0]}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <Header title="Claim credential" />
      <Container>
        <Spinner />
      </Container>
    </>
  )
}
