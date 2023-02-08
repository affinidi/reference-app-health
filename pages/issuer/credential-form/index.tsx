import { FC } from "react";
import { Field, Formik } from "formik";

import { JSON_SCHEMA_URL } from "utils";
import { useAuthContext } from "hooks/useAuthContext";
import { Container, Header, Input, Select, Spinner } from "components";

import {
  DosageUnitOptions,
  FrequencyIntervalUnitOptions,
  initialValues,
  useCredentialForm,
  SelectOption,
} from "./useCredentialForm";
import * as S from "./CredentialForm.styled";

const CredentialForm: FC = () => {
  const { authState } = useAuthContext();
  const { handleSubmit, validate, isCreating } = useCredentialForm();

  const CustomSelectComponent = ({ field, form, ...props }) => {
    const { name } = field;
    const handleSelectChange = (value: unknown) => {
      form.setFieldValue(name, (value as SelectOption).value);
    };

    return <Select onChange={handleSelectChange} {...props} />;
  };

  if (!authState.authorizedAsIssuer) {
    return <Spinner />;
  }

  return (
    <>
      <Header title="Enter details" />

      <Container>
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-3">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validate={validate}
            >
              {(formikProps) => (
                <form id="form" onSubmit={formikProps.handleSubmit}>
                  <S.Title variant="p1">
                    Please fill in the form below to issue a credential.
                  </S.Title>

                  <Input label="Schema URL" value={JSON_SCHEMA_URL} disabled />

                  <S.Heading variant="h6">Prescription details</S.Heading>

                  <div className="grid lg:grid-cols-2 lg:gap-x-8">
                    <S.InputWrapper
                      label="Medication name"
                      placeholder="Enter medication name"
                      name="medicationName"
                      maxLength={100}
                      value={formikProps.values.medicationName}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.medicationName
                          ? Boolean(formikProps.errors.medicationName)
                          : false
                      }
                      helpText={
                        formikProps.touched.medicationName
                          ? formikProps.errors.medicationName
                          : ""
                      }
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label="Date"
                      placeholder="DD/MM/YYYY"
                      name="prescribedAt"
                      type="date"
                      value={formikProps.values.prescribedAt}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.prescribedAt
                          ? Boolean(formikProps.errors.prescribedAt)
                          : false
                      }
                      helpText={
                        formikProps.touched.prescribedAt
                          ? formikProps.errors.prescribedAt
                          : ""
                      }
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label="Practitioner"
                      name="practitionerName"
                      placeholder="Enter practitioner's name"
                      maxLength={100}
                      value={formikProps.values.practitionerName}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.practitionerName
                          ? Boolean(formikProps.errors.practitionerName)
                          : false
                      }
                      helpText={
                        formikProps.touched.practitionerName
                          ? formikProps.errors.practitionerName
                          : ""
                      }
                      onBlur={formikProps.handleBlur}
                    />
                  </div>
                  <div className="grid lg:grid-cols-2 lg:gap-x-8">
                    <div className="grid lg:grid-rows-2">
                      <S.Heading variant="h6">Dosage</S.Heading>
                      <div className="grid lg:grid-cols-2 lg:gap-x-4">
                        <S.InputWrapper
                          label="Amount"
                          name="dosageAmount"
                          type="number"
                          value={formikProps.values.dosageAmount}
                          onChange={(_, event) =>
                            formikProps.handleChange(event)
                          }
                          hasError={
                            formikProps.touched.dosageAmount
                              ? Boolean(formikProps.errors.dosageAmount)
                              : false
                          }
                          helpText={
                            formikProps.touched.dosageAmount
                              ? formikProps.errors.dosageAmount
                              : ""
                          }
                          onBlur={formikProps.handleBlur}
                        />
                        <Field
                          name="dosageUnit"
                          defaultValue={DosageUnitOptions[0]}
                          options={DosageUnitOptions}
                          component={CustomSelectComponent}
                          hasError={
                            formikProps.touched.dosageUnit
                              ? Boolean(formikProps.errors.dosageUnit)
                              : false
                          }
                          helpText={
                            formikProps.touched.dosageUnit
                              ? formikProps.errors.dosageUnit
                              : ""
                          }
                          onBlur={formikProps.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="grid lg:grid-rows-2">
                      <S.Heading variant="h6">Frequency</S.Heading>
                      <div className="grid lg:grid-cols-2 lg:gap-x-4">
                        <S.InputWrapper
                          label="Times"
                          name="frequencyTimes"
                          type="number"
                          value={formikProps.values.frequencyTimes}
                          onChange={(_, event) =>
                            formikProps.handleChange(event)
                          }
                          hasError={
                            formikProps.touched.frequencyTimes
                              ? Boolean(formikProps.errors.frequencyTimes)
                              : false
                          }
                          helpText={
                            formikProps.touched.frequencyTimes
                              ? formikProps.errors.frequencyTimes
                              : ""
                          }
                          onBlur={formikProps.handleBlur}
                        />
                        <Field
                          name="frequencyIntervalUnit"
                          defaultValue={FrequencyIntervalUnitOptions[0]}
                          options={FrequencyIntervalUnitOptions}
                          component={CustomSelectComponent}
                          hasError={
                            formikProps.touched.frequencyIntervalUnit
                              ? Boolean(
                                  formikProps.errors.frequencyIntervalUnit
                                )
                              : false
                          }
                          helpText={
                            formikProps.touched.frequencyIntervalUnit
                              ? formikProps.errors.frequencyIntervalUnit
                              : ""
                          }
                          onBlur={formikProps.handleBlur}
                        />
                      </div>
                    </div>
                  </div>

                  <S.Heading variant="h6">Patient information</S.Heading>

                  <div className="grid lg:grid-cols-2 lg:gap-x-8">
                    <S.InputWrapper
                      label="Patient name"
                      name="patientName"
                      maxLength={100}
                      placeholder="Enter patient name"
                      value={formikProps.values.patientName}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.patientName
                          ? Boolean(formikProps.errors.patientName)
                          : false
                      }
                      helpText={
                        formikProps.touched.patientName
                          ? formikProps.errors.patientName
                          : ""
                      }
                      onBlur={formikProps.handleBlur}
                    />
                    <S.InputWrapper
                      label="Patient email"
                      name="patientEmail"
                      type="email"
                      placeholder="Enter patient email"
                      maxLength={100}
                      value={formikProps.values.patientEmail}
                      onChange={(_, event) => formikProps.handleChange(event)}
                      hasError={
                        formikProps.touched.patientEmail
                          ? Boolean(formikProps.errors.patientEmail)
                          : false
                      }
                      helpText={
                        formikProps.touched.patientEmail
                          ? formikProps.errors.patientEmail
                          : ""
                      }
                      onBlur={formikProps.handleBlur}
                    />
                  </div>

                  <S.ButtonWrapper
                    type="submit"
                    form="form"
                    disabled={!(formikProps.isValid && formikProps.dirty)}
                    loading={isCreating}
                  >
                    Issue Prescription
                  </S.ButtonWrapper>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CredentialForm;
