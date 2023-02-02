import { FC, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRouter } from 'next/router'

import { useAuthContext } from 'hooks/useAuthContext'

import { getQueryParams, ROUTES } from 'utils'
import { Button, Container, Header, Spinner, Typography } from 'components'
import { Credential } from 'pages/holder/components/Credential'

import * as S from './Onboarding.styled'
import {
  useRetrieveSharedCredentialQuery,
  useStoreCredentialMutation,
} from '../hooks/useCredentials'

export const Onboarding: FC = () => {
  const { authState, updateAuthState } = useAuthContext()
  const navigate = useRouter()
  // const [searchParams] = useSearchParams()
  console.log(navigate.query.credentialOfferRequestToken)

  // const vcUrl_ = searchParams.get('vcURL')
  const vcUrl_ = navigate.query.vcUrl
  // const onboardingLink_ = searchParams.get('onboardingLink')
  const onboardingLink_ = navigate.query.onboardingLink
  const params = getQueryParams({
    vcURL: vcUrl_,
    onboardingLink: onboardingLink_,
  })
  const { data, error, isLoading } = useRetrieveSharedCredentialQuery(
    authState.vcHash,
    authState.vcKey
  )
  const {
    data: storedCredentialData,
    error: storedCredentialError,
    mutateAsync,
  } = useStoreCredentialMutation()

  const handleStoreCredential = async () => {
    if (data) await mutateAsync({ data: [data] })
  }

  const handleDeleteCredential = () => {
    navigate.push(ROUTES.holder.home)
  }

  const handleLink = () => {
    if (!params) return
    if (params!.hash && params!.key) {
      updateAuthState({ vcHash: params!.hash, vcKey: params!.key })
      if (!authState.authorizedAsHolder) {
        navigate.push(ROUTES.holder.signIn)
      }
    }
  }

  useEffect(() => {
    if (storedCredentialData) {
      navigate.push(ROUTES.holder.home)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedCredentialData])

  useEffect(() => {
    handleLink()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <>
        <Header title='Onboarding' />
        <Container>
          <Spinner />
        </Container>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header title='Onboarding' />
        <Container>
          {error && <Typography variant='e1'>{error.message}</Typography>}
        </Container>
      </>
    )
  }

  return (
    <>
      <Header title='Onboarding' />
      <Container>
        {data && (
          <>
            <Credential credentialSubject={data.credentialSubject} />

            <S.ButtonContainer direction='row' justifyContent='space-between'>
              <Button onClick={handleStoreCredential}>Save</Button>
              <Button variant='outlined' onClick={handleDeleteCredential}>
                Reject
              </Button>
            </S.ButtonContainer>
          </>
        )}

        {storedCredentialError && (
          <Typography variant='e1'>{storedCredentialError.message}</Typography>
        )}
      </Container>
    </>
  )
}

export default Onboarding
