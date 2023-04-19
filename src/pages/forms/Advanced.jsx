import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  MenuItem,
  Stack,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import FormCheckbox from "./FormCheckbox";
import FormItemRadioGroup from "./FormItemRadioGroup";
import FormItemTextField from "./FormItemTextField";
import {
  FormVContext,
  getDefaultStates,
  selectOptions,
} from "./FormValidations";

const Advanced = () => {
  const methods = useForm({ mode: "all", defaultValues: getDefaultStates() });

  const cardRef = useRef();
  const [contextValue, setContextValue] = useState({
    nodeList: [],
    names: [],
    nativeValidation: false,
  });

  useEffect(() => {
    const nodeList = cardRef.current.querySelectorAll("[name]");
    const names = [];

    for (let v of nodeList) {
      names.push(v.name);
    }

    setContextValue((prev) => ({ ...prev, nodeList, names }));
  }, []);

  return (
    <FormVContext.Provider value={contextValue}>
      <FormProvider {...methods}>
        <Card
          ref={cardRef}
          component="form"
          onSubmit={methods.handleSubmit((data) => console.log(data))}
        >
          <CardHeader title="Advanced for consistent design" />
          <CardContent>
            <Stack spacing={3}>
              <FormItemTextField label="Text Input" name="text" />
              <FormItemTextField
                label="Email Input"
                name="email"
                type="email"
              />
              <FormItemTextField label="Password" name="pwd" type="password" />
              <FormItemTextField
                label="Date Input"
                name="date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
              <FormItemTextField
                label="Disabled Input"
                name="disabled-input"
                disabled
              />
              <FormItemTextField
                label="Textarea"
                name="textarea"
                multiline
                minRows="4"
                registerOptions={{ required: undefined }}
              />

              <FormItemTextField label="Select" name="select" select>
                {selectOptions.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </FormItemTextField>
              <FormItemTextField
                label="Select Small"
                name="selectSmall"
                select
                size="small"
                registerOptions={{ required: undefined }}
              >
                {selectOptions.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </FormItemTextField>
              <FormItemTextField
                label="Disabled Select"
                name="disabled-select"
                select
                disabled
              >
                {selectOptions.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </FormItemTextField>

              <FormItemRadioGroup label="Radios" name="radio" />
              <FormItemRadioGroup
                label="Inline Radios"
                name="inlineRadio"
                row
              />

              <FormCheckbox label="Checkboxes" namePrefix="checkbox" />
              <FormCheckbox
                label="Inline Checkboxes"
                namePrefix="inlineCheckbox"
                row
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ mt: 5 }}>
            <Button variant="contained" type="submit" size="large">
              Submit
            </Button>
            <Button
              onClick={() => {
                methods.reset();
              }}
            >
              Reset
            </Button>
          </CardActions>
        </Card>
      </FormProvider>
    </FormVContext.Provider>
  );
};

export default Advanced;
