import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Tooltip,
} from "@mui/material";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useController, useFormContext } from "react-hook-form";
import {
  AppendRequired,
  getRequiredCheckboxName,
  selectOptions,
  useDisplayInvalidations,
  useEvents,
  useRules,
} from "./FormValidations";

const FormCheckbox = ({
  namePrefix,
  registerOptions,
  helperText,
  ...props
}) => {
  const representiveName = useMemo(
    () => getRequiredCheckboxName(namePrefix),
    [namePrefix]
  );

  const {
    control,
    formState: { errors },
  } = useFormContext();
  const {
    field: { onChange, onBlur, ref, value },
  } = useController({
    name: representiveName,
    control,
    rules: { required: "필수!", ...registerOptions },
  });

  const [openTooltip, setOpenTooltip] = useState(false);

  const { helperTextWithErrorMessage } = useDisplayInvalidations({
    name: representiveName,
    helperText,
    setOpenTooltip,
  });

  const { rules, label } = useRules(props.disabled, props.label, {
    ...registerOptions,
    required: undefined,
  });

  return (
    <FormControl
      component="fieldset"
      error={!!errors[representiveName]}
      variant="standard"
      name={representiveName}
    >
      <FormLabel component="legend">
        <Tooltip
          open={openTooltip}
          title={helperTextWithErrorMessage}
          arrow
          placement="right"
        >
          <span>
            <AppendRequired label={label} />
          </span>
        </Tooltip>
      </FormLabel>
      <FormGroup row={props.row}>
        {selectOptions.map(({ label: checkboxLabel, value }, index) => (
          <FormCheckboxItem
            key={value}
            label={checkboxLabel}
            value={value}
            namePrefix={namePrefix}
            index={index}
            rules={rules}
            setOpenTooltip={setOpenTooltip}
            ref={index === 0 ? ref : undefined}
          />
        ))}
      </FormGroup>
      {!!errors[representiveName] && (
        <FormHelperText>{helperTextWithErrorMessage}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormCheckbox;

const FormCheckboxItem = forwardRef(
  (
    { label, value: checkboxValue, namePrefix, index, rules, setOpenTooltip },
    ref
  ) => {
    const name = useMemo(
      () => namePrefix.concat(index + 1),
      [namePrefix, index]
    );
    const { control, getValues, setValue } = useFormContext();
    const {
      field: { onChange, onBlur, ref: _, value },
    } = useController({ name, control, rules });

    const { handleBlur, handleChange: _handleChange } = useEvents({
      onBlur,
      onChange,
      setOpenTooltip,
    });

    const handleChange = useCallback(
      (ev) => {
        _handleChange(ev);

        const representiveName = getRequiredCheckboxName(namePrefix);
        const values = getValues();

        setValue(
          representiveName,
          Object.entries(values).some(
            ([k, v]) => k !== representiveName && k.startsWith(namePrefix) && v
          ),
          { shouldValidate: true }
        );
      },
      [_handleChange, namePrefix, getValues]
    );

    const formProps = { name, inputRef: ref, checked: value };

    return (
      <FormControlLabel
        key={checkboxValue}
        label={label}
        value={checkboxValue}
        control={
          <Checkbox
            {...formProps}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        }
      />
    );
  }
);
