import { FC } from 'react'
import { format } from 'date-fns'

import { useAuthContext } from 'hooks/useAuthContext'
import NoData from 'public/images/illustration-empty-state.svg'
import { Container, Header, Spinner, Typography } from 'components'

import { Credential } from './types'
import PrescriptionCard from './components/PrescriptionCard/PrescriptionCard'
import * as S from './index.styled'
import { VerifiableCredential } from '../../types/vc'
import { useHolderApi } from '../../hooks/holder/useHolderApi'

const Home: FC = () => {
  const { authState } = useAuthContext()
  const { useGetVcsQuery } = useHolderApi()
  const { data, error } = useGetVcsQuery() 

  if (!authState.authorizedAsHolder) {
    return <Spinner />
  }

  if (!data) {
    return (
      <>
        <Header title="Your medical records" />
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header title="Your medical records" />
        <Container>
          <div className="grid justify-content-center">
            {error && <Typography variant="e1">{error?.message}</Typography>}
          </div>
        </Container>
      </>
    )
  }

  if (data?.vcs.length === 0) {
    return (
      <>
        <Header title="Your medical records" />
        <Container>
          <div className="grid justify-content-center">
            <Typography align="center" variant="p2">
              You don&apos;t have any medical records yet.
            </Typography>
            <S.IconContainer>
              <NoData />
            </S.IconContainer>
          </div>
        </Container>
      </>
    )
  }

  const validPrescriptions: VerifiableCredential[] = data.vcs.filter((credentialItem) => {
    const credentialSubject = (credentialItem as VerifiableCredential)?.credentialSubject
    return Date.parse(credentialSubject?.startDate) >= Date.now()
  })

  const getPrescriptionCards = ({
    prescriptions,
    isValid,
  }: {
    prescriptions: VerifiableCredential[]
    isValid: boolean
  }) =>
    prescriptions.map((credentialItem: VerifiableCredential) => {
      const credential: Credential = {
        title: credentialItem?.credentialSubject?.eventName,
        date: format(new Date(credentialItem?.credentialSubject?.startDate), 'dd.MM.yyyy'),
        time: format(new Date(credentialItem?.credentialSubject?.startDate), 'HH:mm'),
        credentialId: credentialItem?.id,
      }

      return <PrescriptionCard key={credentialItem.id} credential={credential} isValid={isValid} />
    })

  return (
    <>
      <Header title="Your medical records" />

      {validPrescriptions.length > 0 && (
        <Container>
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-16">
            {getPrescriptionCards({ prescriptions: validPrescriptions, isValid: true })}
          </div>
        </Container>
      )}
    </>
  )
}

export default Home
