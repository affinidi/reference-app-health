import axios from 'axios'
import { FC, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { Container, Header, Spinner } from 'components'
import { hostUrl } from 'pages/env'
import { useSessionStorage } from 'hooks/useSessionStorage'

const ClaimVc: FC = () => {
  const { push } = useRouter()
  const { getItem } = useSessionStorage()
  const searchParams = useSearchParams()
  const credentialOfferRequestToken = searchParams.get('credentialOfferRequestToken')

  useEffect(() => {
    if (!credentialOfferRequestToken) return

    async function claimVc() {
      try {
        const { data: { credentialId } } = await axios<{ credentialId: string }>(
          `${hostUrl}/api/holder/claim-vc`,
          {
            method: 'POST',
            data: {
              credentialOfferRequestToken,
            },
            headers: {
              'Authorization': getItem('accessToken'),
            }
          }
        )
  
        await push(`${ROUTES.holder.credential}/${credentialId}`)
      } catch {
        // TODO: show error
        await push(ROUTES.holder.home)
      }
    }

    claimVc()
  }, [credentialOfferRequestToken])

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
