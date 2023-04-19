import { Container, Grid, Typography } from "@mui/material";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useFormContext } from "react-hook-form";

import Advanced from "./Advanced";
import Html5 from "./Html5";

const FormValidations = () => {
  return (
    <Container>
      <Typography variant="h4">Form validations</Typography>

      <Grid container justifyContent="center" spacing={3} sx={{ py: 3 }}>
        <Grid item xs={12} lg={6}>
          <Advanced />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Html5 />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormValidations;

export const getRequiredCheckboxName = (name) => name.concat("Some");

export const getDefaultStates = () => ({
  text: "",
  email: "",
  pwd: "",
  date: "",
  textarea: "",
  select: "",
  selectSmall: "",
  "disabled-select": "",
  radio: "",
  inlineRadio: "",
  [getRequiredCheckboxName("checkbox")]: false,
  checkbox1: false,
  checkbox2: false,
  checkbox3: false,
  checkbox4: false,
  [getRequiredCheckboxName("inlineCheckbox")]: false,
  inlineCheckbox1: false,
  inlineCheckbox2: false,
  inlineCheckbox3: false,
  inlineCheckbox4: false,
});

export const FormVContext = createContext();

export const useEvents = ({ onBlur, onChange, setOpenTooltip }) => {
  const { nativeValidation } = useContext(FormVContext);

  const handleBlur = useCallback(
    (ev) => {
      onBlur(ev);

      try {
        if (nativeValidation) {
          ev.target.setCustomValidity("");
        } else if (setOpenTooltip) {
          setOpenTooltip(false);
        }
      } catch (err) {}
    },
    [onBlur, setOpenTooltip]
  );

  const handleChange = useCallback(
    (ev) => {
      onChange(ev);

      try {
        if (nativeValidation) {
          ev.target.setCustomValidity("");
        } else if (setOpenTooltip) {
          setOpenTooltip(false);
        }
      } catch (err) {}
    },
    [onChange, setOpenTooltip]
  );

  return { handleBlur, handleChange };
};

export const useRules = (disabled, label, registerOptions) => {
  return useMemo(() => {
    const r = {
      ...(!disabled && { required: "필수!" }),
      ...registerOptions,
    };
    const l = r.required ? <AppendRequired label={label} /> : label;

    return { rules: r, label: l };
  }, [disabled, label, registerOptions]);
};

export const useDisplayInvalidations = ({
  name,
  helperText,
  setOpenTooltip,
}) => {
  const { names, nativeValidation } = useContext(FormVContext);
  const {
    formState: { errors, isSubmitted, isSubmitting },
  } = useFormContext();

  useEffect(() => {
    const firstErrorName = names.find((n) => errors[n]);

    // console.log(isSubmitted, isSubmitting, errors, names, name);

    if ((isSubmitted || isSubmitting) && firstErrorName === name) {
      const error = errors[firstErrorName];
      // console.log(firstErrorName, name, error, error.ref.focus);

      try {
        if (nativeValidation) {
          error.ref.setCustomValidity(error.message);
          error.ref.reportValidity();
        } else if (setOpenTooltip) {
          setOpenTooltip(true);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [errors, names, name, isSubmitted, isSubmitting]);

  return { helperTextWithErrorMessage: errors[name]?.message || helperText };
};

export const selectOptions = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

export const AppendRequired = ({ label }) => {
  return (
    <>
      {label}{" "}
      <Typography variant="body1" component="span" color="error">
        *
      </Typography>
    </>
  );
};
