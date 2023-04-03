import { Container, Grid, TextField, Typography } from "@mui/material";
import { createContext, useCallback, useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

// import Advanced from "./Advanced";
import Html5 from "./Html5";

const FormValidations = () => {
  return (
    <Container>
      <Typography variant="h4">Form validations</Typography>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} lg={6}>
          {/* <Advanced /> */}
        </Grid>

        <Grid item xs={12} lg={6}>
          <Html5 />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormValidations;

export const getDefaultStates = () => ({
  text: "",
  email: "",
  pwd: "",
  date: "",
  textarea: "",
  select: "",
  radio: "",
  inlineRadio: "",
  checkbox1: "",
  checkbox2: "",
  checkbox3: "",
  inlineCheckbox1: "",
  inlineCheckbox2: "",
  inlineCheckbox3: "",
});

export const FormVContext = createContext();

export const FormItem = ({ name, registerOptions, helperText, ...props }) => {
  const { names, nativeValidation } = useContext(FormVContext);
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  // console.log("nodeList", nodeList, nativeValidation);

  const { onBlur, onChange, ...formProps } = register(name, {
    required: "필수!",
    ...registerOptions,
  });

  const handleBlur = useCallback(
    (ev) => {
      onBlur(ev);
      ev.target.setCustomValidity("");
    },
    [onBlur]
  );

  const handleChange = useCallback(
    (ev) => {
      onChange(ev);
      ev.target.setCustomValidity("");
    },
    [onChange]
  );

  useEffect(() => {
    const firstErrorName = names.find((n) => errors[n]);

    // console.log(isSubmitting, errors, names, name, n2);

    if (!isSubmitting && firstErrorName == name) {
      const error = errors[firstErrorName];
      // console.log(firstErrorName, name, errors);
      error.ref.setCustomValidity(error.message);
      error.ref.reportValidity();
    }
  }, [errors, names, name, isSubmitting]);

  return (
    <TextField
      variant="filled"
      //   error={errors[name] && touchedFields[name]}
      //   helperText={(touchedFields[name] && errors[name]?.message) || helperText}
      error={!!errors[name]}
      helperText={errors[name]?.message || helperText}
      {...props}
      {...formProps}
      onBlur={nativeValidation ? handleBlur : onBlur}
      onChange={nativeValidation ? handleChange : onChange}
    />
  );
};
