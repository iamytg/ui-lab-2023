import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import {
  selectOptions,
  useDisplayInvalidations,
  useEvents,
  useRules,
} from "./FormValidations";
import { useState } from "react";

const FormItemRadioGroup = ({
  name,
  registerOptions,
  helperText,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { rules, label } = useRules(
    props.disabled,
    props.label,
    registerOptions
  );

  const {
    field: { onChange, onBlur, ref, value },
  } = useController({ name, control, rules });

  const [openTooltip, setOpenTooltip] = useState(false);

  const { handleBlur, handleChange } = useEvents({
    onBlur,
    onChange,
    setOpenTooltip,
  });

  const { helperTextWithErrorMessage } = useDisplayInvalidations({
    name,
    helperText,
    setOpenTooltip,
  });

  const formProps = { name, value };

  return (
    <FormControl component="fieldset" error={!!errors[name]} variant="standard">
      <FormLabel>
        <Tooltip
          open={openTooltip}
          title={helperTextWithErrorMessage}
          arrow
          placement="right"
        >
          <span>{label}</span>
        </Tooltip>
      </FormLabel>
      <RadioGroup
        name={name}
        {...formProps}
        {...props}
        onBlur={handleBlur}
        onChange={handleChange}
      >
        {selectOptions.map(
          ({ label: radioLabel, value: radioValue }, index) => (
            <FormControlLabel
              key={radioValue}
              label={radioLabel}
              value={radioValue}
              control={<Radio inputRef={index === 0 ? ref : undefined} />}
            />
          )
        )}
      </RadioGroup>
      {!!errors[name] && (
        <FormHelperText>{helperTextWithErrorMessage}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormItemRadioGroup;
