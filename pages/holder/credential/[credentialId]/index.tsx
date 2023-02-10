import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { Container, Header, Spinner } from 'components'

import { Credential } from '../../components/Credential/Credential'
import { useShareVcQuery } from 'hooks/holder/api'

const CredentialView: FC = () => {
  const router = useRouter()
  const credentialId = router.query.credentialId as string

  const { data, error } = useShareVcQuery({ credentialId })

  useEffect(() => {
    if (error) {
      // TODO: show error
      router.push(ROUTES.holder.home)
    }
  }, [router, error])

  if (!data) {
    return <Spinner />
  }

  return (
    <>
      <Header
        title={data.vc.credentialSubject.eventName || ''}
        path={ROUTES.holder.home}
        hasBackIcon
      />

      <Container>
        <Credential
          credentialSubject={data.vc.credentialSubject}
          qrCode={data.qrCode}
        />
      </Container>
    </>
  )
}

export default CredentialView
