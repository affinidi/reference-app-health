import axios from 'axios'
import { format } from 'date-fns'
import { useCallback, useState } from 'react'
import * as EmailValidator from 'email-validator'
import { useRouter } from 'next/router'

import { hostUrl } from 'pages/env'
import { ROUTES } from 'utils'
import { useSessionStorage } from '../../../hooks/useSessionStorage'

export const adjustForUTCOffset = (date: Date) => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  )
}

export type EventSubjectData = {
  eventName: string
  eventLocation: string
  eventStartDateTime: string
  eventEndDateTime: string
  eventDescription: string
  name: string
  email: string
}

export const initialValues: EventSubjectData = {
  eventName: '',
  eventLocation: '',
  eventStartDateTime: '',
  eventEndDateTime: '',
  eventDescription: '',
  name: '',
  email: '',
}

export const useCredentialForm = () => {
  const router = useRouter()
  const { getItem } = useSessionStorage()
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = useCallback(
    async (values: EventSubjectData) => {
      setIsCreating(true)

      try {
        await axios(
          `${hostUrl}/api/issuer/send-vc-offer`,
          {
            data: {
              targetEmail: values.email,
              credentialSubject: {
                startDate: format(
                  adjustForUTCOffset(new Date(values.eventStartDateTime)),
                  'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'',
                ),
                endDate: format(
                  adjustForUTCOffset(new Date(values.eventEndDateTime)),
                  'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'',
                ),
                place: values.eventLocation,
                eventName: values.eventName,
                eventDescription: values.eventDescription,
                name: values.name,
                email: values.email,
              },
            },
            headers: {
              Authorization: `Basic ${getItem('issuerLogin')}:${getItem('issuerPassword')}`
            }
          }
        )

        router.push(ROUTES.issuer.result)
      } catch {
        setIsCreating(false)
      }
    },
    [router, getItem],
  )

  const validate = useCallback((values: EventSubjectData) => {
    const errors = {} as Partial<EventSubjectData>

    if (!values.eventName) {
      errors.eventName = 'Mandatory field'
    }

    if (!values.eventStartDateTime) {
      errors.eventStartDateTime = 'Mandatory field'
    }

    if (!values.eventEndDateTime) {
      errors.eventEndDateTime = 'Mandatory field'
    }

    if (
      values.eventStartDateTime &&
      values.eventEndDateTime &&
      new Date(values.eventStartDateTime) > new Date(values.eventEndDateTime)
    ) {
      errors.eventStartDateTime = 'Start date time must not be greater than end date time'
    }

    if (!values.eventLocation) {
      errors.eventLocation = 'Mandatory field'
    }

    if (!values.name) {
      errors.name = 'Mandatory field'
    }

    if (!values.email) {
      errors.email = 'Mandatory field'
    }

    if (!values.email) {
      errors.email = 'Mandatory field'
    } else if (!EmailValidator.validate(values.email)) {
      errors.email = 'Invalid email'
    }

    return errors
  }, [])

  return {
    handleSubmit,
    validate,
    isCreating,
  }
}
