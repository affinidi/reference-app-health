import { FC, useEffect, useState } from 'react'
import { Container, ContainerForm, Header, Input } from 'components'
import { useSessionStorage } from 'hooks/useSessionStorage'
import { useCheckCredentialsMutation } from 'hooks/issuer/api'
import { useAuthContext } from 'hooks/useAuthContext'

import * as S from './index.styled'

const IssuerLogIn: FC = () => {
  const { setItem } = useSessionStorage()
  const { updateAuthState } = useAuthContext()
  const { mutate, isSuccess, isError, isLoading, reset } = useCheckCredentialsMutation()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleLogIn = (event: SubmitEvent) => {
    event.preventDefault()
    mutate({ login, password })
  }

  useEffect(() => {
    if (isSuccess) {
      setItem('issuerLogin', login)
      setItem('issuerPassword', password)
      updateAuthState({ authorizedAsIssuer: true })
    }
  }, [isSuccess])

  useEffect(() => {
    reset()
  }, [login, password])

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

            <br/>

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
