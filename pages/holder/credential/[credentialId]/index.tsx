import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { Container, Header, Spinner } from 'components'

import { Credential } from '../../components/Credential/Credential'
import { VerifiableCredential } from '../../../../types/vc'
import axios from 'axios'
import { hostUrl } from '../../../env'
import { useSessionStorage } from '../../../../hooks/useSessionStorage'

const CredentialView: FC = () => {
  const router = useRouter()
  const { getItem } = useSessionStorage()
  const credentialId = router.query.credentialId as string

  const [vc, setVc] = useState<VerifiableCredential>()
  const [qrCode, setQrCode] = useState<string>()

  useEffect(() => {
    if (!credentialId) return

    async function shareVc() {
      const { data: { vc, qrCode } } = await axios<{ vc: VerifiableCredential; qrCode: string }>(
        `${hostUrl}/api/holder/share-vc`,
        {
          method: 'POST',
          data: {
            id: credentialId,
          },
          headers: {
            'Authorization': getItem('accessToken'),
          }
        }
      )

      setVc(vc)
      setQrCode(qrCode)
    }

    shareVc()
  }, [credentialId])

  if (!vc) {
    return <Spinner />
  }

  return (
    <>
      <Header
        title={vc.credentialSubject.eventName || ''}
        path={ROUTES.holder.home}
        hasBackIcon
      />

      <Container>
        <Credential
          credentialSubject={vc.credentialSubject}
          qrCode={qrCode}
        />
      </Container>
    </>
  )
}

export default CredentialView
