import { FC } from 'react'
import Image from 'next/image'

import { JSON_SCHEMA_URL } from 'utils'
import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
import { useCredentialsQuery } from 'hooks/holder/useCredentials'
import { useAuthContext } from 'hooks/useAuthContext'
import NoData from 'public/images/illustration-empty-state.svg'
import { Container, Header, Spinner, Typography } from 'components'

import { Credential } from './types'
import VcCard from './components/VcCard/VcCard'

import * as S from './index.styled'

const Home: FC = () => {
  const { authState } = useAuthContext()
  const { data, error, isLoading } = useCredentialsQuery()

  if (!authState.authorizedAsHolder) {
    return <Spinner />
  }

  if (isLoading) {
    return (
      <>
        <Header title='Your prescriptions' />
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header title='Your prescriptions' />
        <Container>
          <div className='grid justify-content-center'>
            {error && <Typography variant='e1'>{error?.message}</Typography>}
          </div>
        </Container>
      </>
    )
  }

  const vcs = data.filter((credentialItem) => {
    const credentialSchema = (credentialItem as StoredW3CCredential)
      .credentialSchema
    return credentialSchema?.id === JSON_SCHEMA_URL
  })

  if (vcs.length === 0) {
    return (
      <>
        <Header title='Your prescriptions' />
        <Container>
          <div className='grid justify-content-center'>
            <Typography align='center' variant='p2'>
              You don&apos;t have any prescriptions yet.
            </Typography>
            <S.IconContainer>
              <Image src={NoData} alt='No prescriptions' />
            </S.IconContainer>
          </div>
        </Container>
      </>
    )
  }

  // @ts-ignore
  const validVcs: StoredW3CCredential[] = vcs.filter((credentialItem) => {
    const credentialSubject = (credentialItem as StoredW3CCredential)
      ?.credentialSubject
    return Date.parse(credentialSubject?.prescribedAt) >= Date.now()
  })

  const getVcCards = ({ vcs }: { vcs: StoredW3CCredential[] }) =>
    vcs.map((credentialItem: StoredW3CCredential) => {
      const credential: Credential = {
        title: `${credentialItem?.credentialSubject.patient.name} ${credentialItem?.credentialSubject.prescribedAt}`,
        medicationName: credentialItem?.credentialSubject.medicationName,
        credentialId: credentialItem?.id,
      }

      return <VcCard key={credentialItem.id} credential={credential} />
    })

  return (
    <>
      <Header title='Your prescriptions' />

      {validVcs.length > 0 && (
        <Container>
          <div className='grid lg:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-16'>
            {getVcCards({
              vcs: validVcs,
            })}
          </div>
        </Container>
      )}
    </>
  )
}

export default Home
