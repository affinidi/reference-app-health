import { FC } from 'react'
import { Formik } from 'formik'

import { Container, Header, Input, Textarea } from 'components'

import { initialValues, useCredentialForm } from './useCredentialForm'
import * as S from './CredentialForm.styled'

import { JSON_SCHEMA_URL } from 'utils'

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

export const CredentialForm: FC = () => {
  const { handleSubmit, validate, isCreating } = useCredentialForm()

  return (
    <>
      <Header title="Enter details" />

      <Container>
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-3">
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
              {(formikProps) => (
                <form id="form" onSubmit={formikProps.handleSubmit}>
                  <S.Title variant="p1">
                    Please fill in the form below to issue a credential.
                  </S.Title>

                  <Input label="Schema URL" value={JSON_SCHEMA_URL} disabled />

                  <S.Heading variant="h6">Event details</S.Heading>

                  <div className="grid lg:grid-cols-2 lg:gap-x-8">
                    <S.InputWrapper
                      label="Event name"
                      placeholder="Enter event name"
                      name="eventName"
                      maxLength={100}
                      value={formikProps.values.eventName}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={Boolean(formikProps.errors.eventName)}
                      helpText={formikProps.errors.eventName}
                    />
                    <S.InputWrapper
                      label="Event location"
                      placeholder="Enter event location"
                      name="eventLocation"
                      maxLength={500}
                      value={formikProps.values.eventLocation}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={Boolean(formikProps.errors.eventLocation)}
                      helpText={formikProps.errors.eventLocation}
                    />
                    <S.InputWrapper
                      label="Start date & time"
                      name="eventStartDateTime"
                      type="datetime-local"
                      value={formikProps.values.eventStartDateTime}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={Boolean(formikProps.errors.eventStartDateTime)}
                      helpText={formikProps.errors.eventStartDateTime}
                    />
                    <S.InputWrapper
                      label="End date & time"
                      name="eventEndDateTime"
                      type="datetime-local"
                      value={formikProps.values.eventEndDateTime}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={Boolean(formikProps.errors.eventEndDateTime)}
                      helpText={formikProps.errors.eventEndDateTime}
                    />
                    <Textarea
                      label="Event description"
                      name="eventDescription"
                      placeholder="Enter event description"
                      maxLength={1000}
                      value={formikProps.values.eventDescription}
                      onChange={(value, e) => formikProps.handleChange(e)}
                      hasError={Boolean(formikProps.errors.eventDescription)}
                      helpText={formikProps.errors.eventDescription}
                    />
                  </div>

                  <S.Heading variant="h6">Ticket holder information</S.Heading>

                  <div className="grid lg:grid-cols-2 lg:gap-x-8">
                    <S.InputWrapper
                      label="Ticket holder name"
                      name="name"
                      maxLength={100}
                      placeholder="Enter ticket holder name"
                      value={formikProps.values.name}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={Boolean(formikProps.errors.name)}
                      helpText={formikProps.errors.name}
                    />
                    <S.InputWrapper
                      label="Ticket holder email"
                      name="email"
                      type="email"
                      placeholder="Enter ticket holder email"
                      maxLength={100}
                      value={formikProps.values.email}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={Boolean(formikProps.errors.email)}
                      helpText={formikProps.errors.email}
                    />
                  </div>

                  <S.ButtonWrapper
                    type="submit"
                    form="form"
                    disabled={!(formikProps.isValid && formikProps.dirty)}
                    loading={isCreating}
                  >
                    Issue ticket
                  </S.ButtonWrapper>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </Container>
    </>
  )
}
