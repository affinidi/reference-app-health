import { FC, useEffect, useState } from 'react'
import { format } from 'date-fns'

import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
import { useAuthContext } from 'hooks/useAuthContext'
import NoData from 'public/images/illustration-empty-state.svg'
import { Container, Header, Spinner, Typography } from 'components'

import { Credential } from './types'
import PrescriptionCard from './components/PrescriptionCard/PrescriptionCard'
import * as S from './index.styled'
import { VerifiableCredential } from '../../types/vc'
import { hostUrl } from '../env'
import axios from 'axios'
import { useSessionStorage } from '../../hooks/useSessionStorage'

const Home: FC = () => {
  const { authState } = useAuthContext()
  const { getItem } = useSessionStorage()

  const [error, setError] = useState<any>()
  const [vcs, setVcs] = useState<VerifiableCredential[]>()

  useEffect(() => {
    async function fetchVcs() {
      try {
        const { data: { vcs } } = await axios<{ vcs: VerifiableCredential[] }>(
          `${hostUrl}/api/holder/get-vcs`,
          { method: 'GET', headers: { 'Authorization': getItem('accessToken') } }
        )
  
        setVcs(vcs)
      } catch (error) {
        setError(error)
      }
    }

    fetchVcs()
  }, [])

  if (!authState.authorizedAsHolder) {
    return <Spinner />
  }

  if (!vcs) {
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

  if (vcs.length === 0) {
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

  // @ts-ignore
  const validPrescriptions: StoredW3CCredential[] = vcs.filter((credentialItem) => {
    const credentialSubject = (credentialItem as StoredW3CCredential)?.credentialSubject
    return Date.parse(credentialSubject?.startDate) >= Date.now()
  })

  const getPrescriptionCards = ({
    prescriptions,
    isValid,
  }: {
    prescriptions: StoredW3CCredential[]
    isValid: boolean
  }) =>
    prescriptions.map((credentialItem: StoredW3CCredential) => {
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
