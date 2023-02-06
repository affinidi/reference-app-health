import { render, screen } from '@testing-library/react'

import { Credential, renderLiteral } from './Credential'

describe('<CredentialView />', () => {
  describe('Given a subject with 1 nested field', () => {
    it('renders', () => {
      const mockData = {
        '@type': ['Person', 'PersonE', 'KudosPerson'],
        name: 'Random name',
        message: 'some text',
        awardedDate: '4/14/2022 3:04:32 PM',
        awardedBy: 'Random Otherperson Name',
      }
      const subject = {
        data: mockData,
      }
      render(<Credential credentialSubject={subject} />)
      const strings = ['Random name', 'some text', 'Random Otherperson Name']
      strings.forEach((v) => {
        expect(screen.getByText(v)).toBeInTheDocument()
      })
    })
  })

  describe('Given a subject with 2 nested fields', () => {
    it('renders', () => {
      const mockDataFirst = {
        '@type': ['Person', 'PersonE', 'KudosPerson'],
        name: 'Random name',
        message: 'some text',
        awardedDate: '4/14/2022 3:04:32 PM',
        awardedBy: 'Random Otherperson Name',
      }
      const mockDataSecond = {
        '@type': ['Person', 'PersonE', 'KudosPerson'],
        name: 'Second Random name',
        message: 'Second some text',
        awardedDate: '4/14/2001 3:04:30 PM',
        awardedBy: 'Second Random Otherperson Name',
      }
      const subject = { data: mockDataFirst, secondData: mockDataSecond }

      render(<Credential credentialSubject={subject} />)

      const strings = [
        'Random name',
        'Second Random name',
        'some text',
        'Second some text',
        'Random Otherperson Name',
        'Second Random Otherperson Name',
      ]
      strings.forEach((v: string) => {
        expect(screen.getByText(v)).toBeInTheDocument()
      })
    })
  })
})

describe('renderLiteral', () => {
  describe('Given a normal string', () => {
    it("doesn't modify the value", () => {
      expect(renderLiteral('random string')).toEqual('random string')
    })
  })

  describe('Given a string that can be parsed by the Date.parse function', () => {
    it('shows the date in local string format', () => {
      expect(renderLiteral('4/14/2001 3:04:30 PM')).toEqual('Sat Apr 14 2001')
    })
  })
})
