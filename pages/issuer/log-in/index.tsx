import { FC, FormEvent, useEffect, useState } from 'react'

import { useSessionStorage } from 'hooks/useSessionStorage'
import { useCheckCredentialsMutation } from 'hooks/issuer/api'
import { useAuthContext } from 'hooks/useAuthContext'
import { Box, Container, ContainerForm, Header, Input } from 'components'

import * as S from './index.styled'

const IssuerLogIn: FC = () => {
  const { setItem } = useSessionStorage()
  const { updateAuthState } = useAuthContext()
  const { mutate, isSuccess, isError, isLoading, reset } = useCheckCredentialsMutation()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleLogIn = (event: FormEvent<HTMLFormElement>) => {
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
      <Header title="Admin login" />

      <Container>
        <div className="grid lg:grid-cols-3 lg:gap-16">
          <ContainerForm className="lg:col-start-2" onSubmit={handleLogIn}>
            <S.Title variant="p1">Please enter your email address and password to log in.</S.Title>

            <Box gap={24}>
              <Input
                id="email"
                type="email"
                label="Email address"
                placeholder="Enter your email address"
                onChange={setLogin}
                hasError={isError}
              />

              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                onChange={setPassword}
                hasError={isError}
              />
            </Box>

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
