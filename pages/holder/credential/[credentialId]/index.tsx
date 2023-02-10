import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'

import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
import { useGetCredentialQuery, useShareCredentialMutation } from 'hooks/holder/useCredentials'
import { useAuthContext } from 'hooks/useAuthContext'
import { ROUTES } from 'utils'
import { Header, Spinner } from 'components'

import { Credential } from '../../components/Credential/Credential'

import * as S from './credentialId.styled'

const CredentialView: FC = () => {
  const { authState } = useAuthContext()
  const router = useRouter()
  const { credentialId } = router.query
  const { data, isLoading } = useGetCredentialQuery(credentialId || '')
  const { data: shareCredentialData, mutateAsync } = useShareCredentialMutation()

  useEffect(() => {
    if (credentialId) {
      mutateAsync(credentialId)
    }
  }, [mutateAsync, credentialId])

  if (isLoading || !authState.authorizedAsHolder) {
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

      <S.Container>
        <Credential
          credentialSubject={credential.credentialSubject}
          qrCode={shareCredentialData?.qrCode}
        />
      </S.Container>
    </>
  )
}

export default CredentialView
