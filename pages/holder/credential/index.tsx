import { FC, useEffect } from 'react'
import { useParams } from 'react-router'

import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'

import { Container, Header, Spinner } from 'components'
import { Credential } from 'pages/holder/components/Credential'
import {
  useGetCredentialQuery,
  useShareCredentialMutation,
} from '../hooks/useCredentials'
import { ROUTES } from 'utils'

const CredentialView: FC = () => {
  const { credentialId } = useParams()
  const { data, isLoading } = useGetCredentialQuery(credentialId || '')
  const { data: shareCredentialData, mutateAsync } =
    useShareCredentialMutation()

  useEffect(() => {
    if (credentialId) {
      mutateAsync(credentialId)
    }
  }, [mutateAsync, credentialId])

  if (isLoading) {
    return <Spinner />
  }

  if (!(data as StoredW3CCredential).type) {
    return null
  }

  const credential = data as StoredW3CCredential

  return (
    <>
      <Header
        title={credential.credentialSubject.eventName || ''}
        path={ROUTES.holder.home}
        hasBackIcon
      />

      <Container>
        <Credential
          credentialSubject={credential.credentialSubject}
          qrCode={shareCredentialData?.qrCode}
        />
      </Container>
    </>
  )
}

export default CredentialView
