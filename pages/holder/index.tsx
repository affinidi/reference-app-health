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
        <Header title='Your medical records' />
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header title='Your medical records' />
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
        <Header title='Your medical records' />
        <Container>
          <div className='grid justify-content-center'>
            <Typography align='center' variant='p2'>
              You don&apos;t have any medical records yet.
            </Typography>
            <S.IconContainer>
              <Image src={NoData} alt='No medical records' />
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

  const getVcCards = ({ vcs }: { vcs: StoredW3CCredential[] }) => {
    let vcNumber = 1

    return vcs.map((credentialItem: StoredW3CCredential) => {
      const credential: Credential = {
        title: `Prescription Record ${vcNumber++}`,
        medicationName: credentialItem?.credentialSubject.medicationName,
        credentialId: credentialItem?.id,
      }

      return <VcCard key={credentialItem.id} credential={credential} />
    })
  }

  return (
    <>
      <Header title='Your medical records' />

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
