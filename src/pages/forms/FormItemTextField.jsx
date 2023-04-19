import { TextField, Tooltip } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import {
  useDisplayInvalidations,
  useEvents,
  useRules,
} from "./FormValidations";
import { useState } from "react";

const FormItemTextField = ({ name, registerOptions, helperText, ...props }) => {
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

  const formProps = { name, inputRef: ref, value };

  return (
    <Tooltip
      open={openTooltip}
      title={helperTextWithErrorMessage}
      arrow
      placement="top"
    >
      <TextField
        variant="filled"
        error={!!errors[name]}
        helperText={helperTextWithErrorMessage}
        {...formProps}
        {...props}
        label={label}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Tooltip>
  );
};

export default FormItemTextField;
