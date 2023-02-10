import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container, ContainerForm, Header, Input } from 'components'
import { useSessionStorage } from 'hooks/useSessionStorage'
import { useAuthentication } from 'hooks/useAuthentication'
import { useCheckCredentialsMutation } from 'hooks/issuer/api'
import { ROUTES } from 'utils'

import * as S from './index.styled'

const IssuerLogIn: FC = () => {
  const router = useRouter()
  const { setItem } = useSessionStorage()
  const { updateAuthState } = useAuthentication()

  const { mutate, isSuccess, isError, isLoading, reset } = useCheckCredentialsMutation()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleLogIn = () => {
    mutate({ login, password })
  }

  useEffect(() => {
    if (isSuccess) {
      setItem('issuerLogin', login)
      setItem('issuerPassword', password)
      updateAuthState({ authorizedAsIssuer: true })

      router.push(ROUTES.issuer.credentialForm)
    }
  }, [isSuccess, router, setItem, updateAuthState, login, password])

  useEffect(() => {
    reset()
  }, [login, password, reset])

  return (
    <>
      <Header title="Sign in as issuer" />

      <Container>
        <div className="grid lg:grid-cols-3 lg:gap-16">
          <ContainerForm className="lg:col-start-2" onSubmit={handleLogIn}>
            <S.Title variant="p1">Please enter login and password.</S.Title>

            <Input
              id="login"
              type="text"
              label="Login"
              placeholder="Enter your login"
              onChange={(value) => setLogin(value)}
              hasError={isError}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              onChange={(value) => setPassword(value)}
              hasError={isError}
            />

            <S.ButtonWrapper fullWidth disabled={isLoading} loading={isLoading} type="submit">
              log in
            </S.ButtonWrapper>
          </ContainerForm>
        </div>
      </Container>
    </>
  )
}

export default IssuerLogIn
