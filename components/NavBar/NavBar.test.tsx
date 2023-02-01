import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import * as auth from '../../hooks/useAuthContext'
import { useAuthentication } from '../../hooks/useAuthentication'

import NavBar from './NavBar'

describe('<NavBar />', () => {
  it('renders and verifies that the logo is there', () => {
    jest.spyOn(auth, 'useAuthContext').mockReturnValueOnce({
      authState: {
        username: '',
        accessToken: '',
        did: '',
        refreshToken: '',
      },
    } as ReturnType<typeof useAuthentication>)

    render(<NavBar />, { wrapper: BrowserRouter })
    expect(screen.getByLabelText('wallet-logo')).toHaveAttribute('aria-label', 'wallet-logo')
  })

  describe('Given a non-empty token', () => {
    it('shows the menu icon', () => {
      jest.spyOn(auth, 'useAuthContext').mockReturnValueOnce({
        authState: {
          username: '',
          accessToken: '',
          did: '',
          loading: false,
          authorizedAsIssuer: true,
        },
      } as ReturnType<typeof useAuthentication>)
      render(<NavBar />, { wrapper: BrowserRouter })

      expect(screen.getByLabelText('menu-open-icon')).toHaveAttribute(
        'aria-label',
        'menu-open-icon',
      )
    })
  })
})
