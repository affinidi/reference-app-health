import { FC } from 'react'
import Image from 'next/image'

import { JSON_SCHEMA_URL } from 'utils'
import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
import { useCredentialsQuery } from 'hooks/holder/useCredentials'
import { useAuthContext } from 'hooks/useAuthContext'
import NoData from 'public/images/illustration-empty-state.svg'
import { Container, Header, Spinner, Typography } from 'components'

import { Credential } from './types'
import PrescriptionCard from './components/PrescriptionCard/PrescriptionCard'

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

  console.log('dta:', data)

  const prescriptions = data.filter((credentialItem) => {
    const credentialSchema = (credentialItem as StoredW3CCredential)
      .credentialSchema
    return credentialSchema?.id === JSON_SCHEMA_URL
  })

  if (prescriptions.length === 0) {
    return (
      <>
        <Header title='Your medical records' />
        <Container>
          <div className="grid justify-content-center">
            <Typography
              align="center"
              variant="p2"
            >
              You don&apos;t have any medical records yet.
            </Typography>
            <S.IconContainer>
              <Image
                src={NoData}
                alt="No medical records"
              />
            </S.IconContainer>
          </div>
        </Container>
      </>
    )
  }

  // @ts-ignore
  const validPrescriptions: StoredW3CCredential[] = prescriptions.filter(
    (credentialItem) => {
      const credentialSubject = (credentialItem as StoredW3CCredential)
        ?.credentialSubject
      return Date.parse(credentialSubject?.prescribedAt) >= Date.now()
    }
  )

  const getPrescriptionCards = ({
    prescriptions,
    isValid,
  }: {
    prescriptions: StoredW3CCredential[]
    isValid: boolean
  }) =>
    prescriptions.map((credentialItem: StoredW3CCredential) => {
      const credential: Credential = {
        medicationName: credentialItem?.credentialSubject.medicationName,
        credentialId: credentialItem?.id,
      }

      return (
        <PrescriptionCard
          key={credentialItem.id}
          credential={credential}
          isValid={isValid}
        />
      )
    })

  return (
    <>
      <Header title='Your medical records' />

      {validPrescriptions.length > 0 && (
        <Container>
          <div className='grid lg:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-16'>
            {getPrescriptionCards({
              prescriptions: validPrescriptions,
              isValid: true,
            })}
          </div>
        </Container>
      )}
    </>
  )
}

export default Home
