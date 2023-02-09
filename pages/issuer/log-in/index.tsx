import axios from 'axios'
import { FC, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container, ContainerForm, Header, Input } from 'components'
import { useSessionStorage } from 'hooks/useSessionStorage'
import { hostUrl } from 'pages/env'

import * as S from './index.styled'
import { ROUTES } from '../../../utils'

const IssuerLogIn: FC = () => {
  const router = useRouter()
  const { setItem } = useSessionStorage()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleLogIn = useCallback(async () => {
    setIsLoading(true)
    setIsError(false)
    
    try {
      await axios(
        `${hostUrl}/api/issuer/log-in`,
        { headers: { 'Authorization': `Basic ${login}:${password}` } }
      )

      setItem('issuerLogin', login)
      setItem('issuerPassword', password)

      await router.push(ROUTES.issuer.credentialForm)
    } catch {
      setIsError(true)
      setIsLoading(false)
    }
  }, [login, password, setItem, router])

  useEffect(() => {
    setIsError(false)
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
