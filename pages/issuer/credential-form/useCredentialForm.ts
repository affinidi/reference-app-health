import { format } from "date-fns";
import { useCallback, useState } from "react";
import * as EmailValidator from "email-validator";
import { useRouter } from "next/router";

import { JSON_SCHEMA_URL, ROUTES } from "utils";
import { apiKeyHash, projectDid, projectId } from "pages/env";

import { parseSchemaURL } from "services/issuance/parse.schema.url";
import {
  CreateIssuanceInput,
  CreateIssuanceOfferInput,
  VerificationMethod,
} from "services/issuance/issuance.api";
import { issuanceService } from "services/issuance";

export type SelectOption = {
  value: string;
  label: string;
};

export const DosageUnitOptions: SelectOption[] = [
  {
    value: "mg",
    label: "mg",
  },
  {
    value: "g",
    label: "g",
  },
  {
    value: "ml",
    label: "ml",
  },
  {
    value: "piece",
    label: "piece",
  },
];

export const FrequencyIntervalUnitOptions: SelectOption[] = [
  {
    value: "hour",
    label: "per hour",
  },
  {
    value: "day",
    label: "per day",
  },
  {
    value: "week",
    label: "per week",
  },
];

export type PrescriptionData = {
  medicationName: string;
  prescribedAt: string;
  practitionerName: string;
  dosageAmount: string;
  dosageUnit: string;
  frequencyTimes: string;
  frequencyIntervalUnit: string;
  patientName: string;
  patientEmail: string;
};

export const initialValues: PrescriptionData = {
  medicationName: "test",
  prescribedAt: "",
  practitionerName: "",
  dosageAmount: "1",
  dosageUnit: DosageUnitOptions[0].value,
  frequencyTimes: "1",
  frequencyIntervalUnit: FrequencyIntervalUnitOptions[0].value,
  patientName: "",
  patientEmail: "",
};

export const useCredentialForm = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = useCallback(
    async (values: PrescriptionData) => {
      setIsCreating(true);

      const walletUrl = `${window.location.origin}/holder/claim`;
      const { schemaType, jsonSchema, jsonLdContext } =
        parseSchemaURL(JSON_SCHEMA_URL);

      const issuanceJson: CreateIssuanceInput = {
        template: {
          walletUrl,
          verification: {
            method: VerificationMethod.Email,
          },
          schema: {
            type: schemaType,
            jsonLdContextUrl: jsonLdContext.toString(),
            jsonSchemaUrl: jsonSchema.toString(),
          },
          issuerDid: projectDid,
        },
        projectId,
      };

      const offerInput: CreateIssuanceOfferInput = {
        verification: {
          target: {
            email: values.patientEmail,
          },
        },
        credentialSubject: {
          prescribedAt: format(new Date(values.prescribedAt), "dd/MM/yyyy"),
          medicationName: values.medicationName,
          dosage: {
            amount: Number(values.dosageAmount),
            unit: values.dosageUnit,
          },
          practicioner: {
            name: values.practitionerName,
          },
          frequency: {
            amount: Number(values.frequencyTimes),
            interval: {
              amount: 1,
              unit: values.frequencyIntervalUnit,
            },
          },
          patient: {
            name: values.patientName,
            email: values.patientEmail,
          },
        },
      };

      try {
        const issuanceId = await issuanceService.createIssuance(
          apiKeyHash,
          issuanceJson
        );
        await issuanceService.createOffer(
          apiKeyHash,
          issuanceId.id,
          offerInput
        );

        router.push(ROUTES.issuer.result);
      } catch {
        setIsCreating(false);
      }
    },
    [router]
  );

  const validate = useCallback((values: PrescriptionData) => {
    const errors = {} as Partial<PrescriptionData>;

    if (!values.medicationName) {
      errors.medicationName = "Mandatory field";
    }

    if (!values.prescribedAt) {
      errors.prescribedAt = "Mandatory field";
    }

    if (!values.practitionerName) {
      errors.practitionerName = "Mandatory field";
    }

    if (!values.dosageAmount) {
      errors.dosageAmount = "Mandatory field";
    }

    if (!values.dosageUnit) {
      errors.dosageUnit = "Mandatory field";
    }

    if (!values.frequencyIntervalUnit) {
      errors.frequencyIntervalUnit = "Mandatory field";
    }

    if (!values.frequencyTimes) {
      errors.frequencyTimes = "Mandatory field";
    }

    if (!values.patientName) {
      errors.patientName = "Mandatory field";
    }

    if (!values.patientEmail) {
      errors.patientEmail = "Mandatory field";
    } else if (!EmailValidator.validate(values.patientEmail)) {
      errors.patientEmail = "Invalid email";
    }

    return errors;
  }, []);

  return {
    handleSubmit,
    validate,
    isCreating,
  };
};
