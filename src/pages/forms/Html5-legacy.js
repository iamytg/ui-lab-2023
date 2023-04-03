import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CInputCheckbox,
  CInputRadio,
  CInvalidFeedback,
  CLabel,
  CSelect,
  CSwitch,
  CTextarea,
  CValidFeedback,
} from "@coreui/react";
import { useFormik } from "formik";
import { useCallback, useEffect, useRef } from "react";

import { regExps } from "../../../../commons";
import { getDefaultStates } from "../Forms";

const Forms = () => {
  const refs = useRef(getDefaultStates());
  const latestFieldCustomValidity = useRef();

  const {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    // setSubmitting,
    setFieldValue,
    // setFieldTouched,
    // handleChange,
    handleBlur,
    handleSubmit,
    // setValues,
    resetForm,
  } = useFormik({
    initialValues: getDefaultStates(),
    validateOnMount: true,
    validate: (vSet) => {
      const errorSet = {};
      console.debug({ vSet });

      if (!vSet.text) {
        errorSet.text = "필수!";
      }

      if (!vSet.email) {
        errorSet.email = "필수!";
      } else if (!regExps.EMAIL.test(vSet.email)) {
        errorSet.email = "메일 주소 형식에 맞게 입력해주세요.";
      }

      if (!vSet.pwd) {
        errorSet.pwd = "필수!";
      } else if (!regExps.PASSWORD.test(vSet.pwd)) {
        errorSet.pwd = "비밀번호 형식에 맞게 입력해주세요.";
      }

      if (!vSet.date) {
        errorSet.date = "필수!";
      }
      if (!vSet.select) {
        errorSet.select = "필수!";
      }

      if (!vSet.radio) {
        errorSet.radio = "필수!";
      }
      if (!vSet.inlineRadio) {
        errorSet.inlineRadio = "필수!";
      }

      if (!vSet.checkbox1 && !vSet.checkbox2 && !vSet.checkbox3) {
        errorSet.checkbox1 = "필수!";
      }
      if (
        !vSet.inlineCheckbox1 &&
        !vSet.inlineCheckbox2 &&
        !vSet.inlineCheckbox3
      ) {
        errorSet.inlineCheckbox1 = "필수!";
      }
      return errorSet;
    },

    onSubmit: async (finalValues) => {
      console.log({ finalValues });
      alert(
        Object.entries(finalValues).map(([k, v]) => `* ${k}: ${v}`).join(`
`)
      );
    },
  });

  const handleChange = useCallback(
    (ev) => {
      const { type, name, value, checked } = ev.target;
      //   console.debug({ type, name, value, checked });
      setFieldValue(name, type !== "checkbox" || checked ? value : "", true);

      if (refs.current[name]) {
        refs.current[name].setCustomValidity("");
      }
      latestFieldCustomValidity.current = null;
    },
    [setFieldValue]
  );

  useEffect(() => {
    const errorEntries = Object.entries(errors);
    const latest = latestFieldCustomValidity.current;
    let [key, msg] = errorEntries.length ? errorEntries[0] : [];

    console.debug({ isSubmitting, latest, cur: { key, msg } });

    if (isSubmitting) {
      if (key) {
        latestFieldCustomValidity.current = { key, msg };
        refs.current[key].setCustomValidity(msg);
        refs.current[key].reportValidity();
      }
    } else if (latest && (latest.key !== key || latest.msg !== msg)) {
      //   refs.current[latest.key].setCustomValidity("");
      //   latestFieldCustomValidity.current = null;
    }
  }, [isSubmitting, errors]);

  const formItemProps = { onBlur: handleBlur, onChange: handleChange };

  return (
    <>
      <CCard>
        <CCardHeader>
          Form validations
          <small className="text-primary"> HTML5 Native</small>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit} className="form-horizontal">
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">
                  Text Input <span className="text-primary">*</span>
                </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="text-input"
                  name="text"
                  placeholder="Text"
                  innerRef={(ref) => (refs.current.text = ref)}
                  value={values.text}
                  invalid={errors.text && touched.text}
                  valid={!errors.text && touched.text}
                  {...formItemProps}
                />
                <CInvalidFeedback className="help-block">
                  {errors.text}
                </CInvalidFeedback>
                <CValidFeedback className="help-block">
                  Input provided
                </CValidFeedback>
                <CFormText>This is a help text</CFormText>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="email-input">
                  Email Input <span className="text-primary">*</span>
                </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="email"
                  id="email-input"
                  name="email"
                  placeholder="Enter Email"
                  autoComplete="email"
                  noValidate
                  innerRef={(ref) => (refs.current.email = ref)}
                  value={values.email}
                  invalid={errors.email && touched.email}
                  valid={!errors.email && touched.email}
                  {...formItemProps}
                />
                <CInvalidFeedback className="help-block">
                  {errors.email}
                </CInvalidFeedback>
                <CValidFeedback className="help-block">
                  Input provided
                </CValidFeedback>
                <CFormText className="help-block">
                  Please enter your email
                </CFormText>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="password-input">
                  Password <span className="text-primary">*</span>
                </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="password"
                  id="password-input"
                  name="pwd"
                  placeholder="Password"
                  autoComplete="new-password"
                  innerRef={(ref) => (refs.current.pwd = ref)}
                  value={values.pwd}
                  invalid={errors.pwd && touched.pwd}
                  valid={!errors.pwd && touched.pwd}
                  {...formItemProps}
                />
                <CInvalidFeedback className="help-block">
                  {errors.pwd}
                </CInvalidFeedback>
                <CValidFeedback className="help-block">
                  Input provided
                </CValidFeedback>
                <CFormText className="help-block">
                  Please enter a complex password
                </CFormText>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">
                  Date Input <span className="text-primary">*</span>
                </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="date"
                  id="date-input"
                  name="date"
                  placeholder="date"
                  innerRef={(ref) => (refs.current.date = ref)}
                  value={values.date}
                  invalid={errors.date && touched.date}
                  valid={!errors.date && touched.date}
                  {...formItemProps}
                />
                <CInvalidFeedback className="help-block">
                  {errors.date}
                </CInvalidFeedback>
                <CValidFeedback className="help-block">
                  Input provided
                </CValidFeedback>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="disabled-input">Disabled Input</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  id="disabled-input"
                  name="disabled-input"
                  placeholder="Disabled"
                  disabled
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="textarea-input">Textarea</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CTextarea
                  name="textarea-input"
                  id="textarea-input"
                  rows="9"
                  placeholder="Content..."
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">
                  Select <span className="text-primary">*</span>
                </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect
                  custom
                  name="select"
                  id="select"
                  innerRef={(ref) => (refs.current.select = ref)}
                  value={values.select}
                  invalid={errors.select && touched.select}
                  valid={!errors.select && touched.select}
                  {...formItemProps}
                >
                  <option value="">Please select</option>
                  <option value="1">Option #1</option>
                  <option value="2">Option #2</option>
                  <option value="3">Option #3</option>
                </CSelect>
                <CInvalidFeedback className="help-block">
                  {errors.select}
                </CInvalidFeedback>
                <CValidFeedback className="help-block">
                  Input provided
                </CValidFeedback>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="selectLg">Select Large</CLabel>
              </CCol>
              <CCol xs="12" md="9" size="lg">
                <CSelect custom size="lg" name="selectLg" id="selectLg">
                  <option value="0">Please select</option>
                  <option value="1">Option #1</option>
                  <option value="2">Option #2</option>
                  <option value="3">Option #3</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="selectSm">Select Small</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom size="sm" name="selectSm" id="SelectLm">
                  <option value="0">Please select</option>
                  <option value="1">Option #1</option>
                  <option value="2">Option #2</option>
                  <option value="3">Option #3</option>
                  <option value="4">Option #4</option>
                  <option value="5">Option #5</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="disabledSelect">Disabled Select</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect
                  custom
                  name="disabledSelect"
                  id="disabledSelect"
                  disabled
                  autoComplete="name"
                >
                  <option value="0">Please select</option>
                  <option value="1">Option #1</option>
                  <option value="2">Option #2</option>
                  <option value="3">Option #3</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol tag="label" sm="3" className="col-form-label">
                Switch checkboxes
              </CCol>
              <CCol sm="9">
                <CSwitch className="mr-1" color="primary" defaultChecked />
                <CSwitch
                  className="mr-1"
                  color="success"
                  defaultChecked
                  variant="outline"
                />
                <CSwitch
                  className="mr-1"
                  color="warning"
                  defaultChecked
                  variant="opposite"
                />
                <CSwitch
                  className="mr-1"
                  color="danger"
                  defaultChecked
                  shape="pill"
                />
                <CSwitch
                  className="mr-1"
                  color="info"
                  defaultChecked
                  shape="pill"
                  variant="outline"
                />
                <CSwitch
                  className="mr-1"
                  color="dark"
                  defaultChecked
                  shape="pill"
                  variant="opposite"
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>
                  Radios <span className="text-primary">*</span>
                </CLabel>
              </CCol>
              <CCol md="9">
                <CFormGroup
                  variant="checkbox"
                  className={errors.radio && touched.radio ? "is-invalid" : ""}
                >
                  <CInputRadio
                    className="form-check-input"
                    id="radio1"
                    name="radio"
                    value="option1"
                    innerRef={(ref) => (refs.current.radio = ref)}
                    checked={values.radio === "option1"}
                    invalid={errors.radio && touched.radio}
                    valid={!errors.radio && touched.radio}
                    onChange={handleChange}
                  />
                  <CLabel variant="checkbox" htmlFor="radio1">
                    Option 1
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox">
                  <CInputRadio
                    className="form-check-input"
                    id="radio2"
                    name="radio"
                    value="option2"
                    checked={values.radio === "option2"}
                    invalid={errors.radio && touched.radio}
                    valid={!errors.radio && touched.radio}
                    onChange={handleChange}
                  />
                  <CLabel variant="checkbox" htmlFor="radio2">
                    Option 2
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox">
                  <CInputRadio
                    className="form-check-input"
                    id="radio3"
                    name="radio"
                    value="option3"
                    checked={values.radio === "option3"}
                    invalid={errors.radio && touched.radio}
                    valid={!errors.radio && touched.radio}
                    onChange={handleChange}
                  />
                  <CLabel variant="checkbox" htmlFor="radio3">
                    Option 3
                  </CLabel>
                </CFormGroup>
                <CInvalidFeedback className="help-block">
                  {errors.radio}
                </CInvalidFeedback>
                <CValidFeedback className="help-block">
                  Input provided
                </CValidFeedback>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>
                  Inline Radios <span className="text-primary">*</span>
                </CLabel>
              </CCol>
              <CCol md="9">
                <CFormGroup
                  variant="custom-radio"
                  inline
                  className={
                    errors.inlineRadio && touched.inlineRadio
                      ? "is-invalid"
                      : ""
                  }
                >
                  <CInputRadio
                    custom
                    id="inline-radio1"
                    name="inlineRadio"
                    value="option1"
                    innerRef={(ref) => (refs.current.inlineRadio = ref)}
                    checked={values.inlineRadio === "option1"}
                    invalid={errors.inlineRadio && touched.inlineRadio}
                    valid={!errors.inlineRadio && touched.inlineRadio}
                    onChange={handleChange}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
                    One
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-radio" inline>
                  <CInputRadio
                    custom
                    id="inline-radio2"
                    name="inlineRadio"
                    value="option2"
                    checked={values.inlineRadio === "option2"}
                    invalid={errors.inlineRadio && touched.inlineRadio}
                    valid={!errors.inlineRadio && touched.inlineRadio}
                    onChange={handleChange}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
                    Two
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-radio" inline>
                  <CInputRadio
                    custom
                    id="inline-radio3"
                    name="inlineRadio"
                    value="option3"
                    checked={values.inlineRadio === "option3"}
                    invalid={errors.inlineRadio && touched.inlineRadio}
                    valid={!errors.inlineRadio && touched.inlineRadio}
                    onChange={handleChange}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-radio3">
                    Three
                  </CLabel>
                </CFormGroup>
                <CInvalidFeedback className="help-block">
                  {errors.inlineRadio}
                </CInvalidFeedback>
                <CValidFeedback className="help-block">
                  Input provided
                </CValidFeedback>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>
                  Checkboxes <span className="text-primary">*</span>
                </CLabel>
              </CCol>
              <CCol md="9">
                <CFormGroup
                  variant="checkbox"
                  className={`checkbox ${
                    errors.checkbox1 && touched.checkbox1 ? "is-invalid" : ""
                  }`}
                >
                  <CInputCheckbox
                    id="checkbox1"
                    name="checkbox1"
                    value="option1"
                    innerRef={(ref) => (refs.current.checkbox1 = ref)}
                    checked={values.checkbox1 === "option1"}
                    invalid={errors.checkbox1 && touched.checkbox1}
                    valid={!errors.checkbox1 && touched.checkbox1}
                    onChange={handleChange}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="checkbox1"
                  >
                    Option 1
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputCheckbox
                    id="checkbox2"
                    name="checkbox2"
                    value="option2"
                    checked={values.checkbox2 === "option2"}
                    invalid={errors.checkbox1 && touched.checkbox1}
                    valid={!errors.checkbox1 && touched.checkbox1}
                    onChange={handleChange}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="checkbox2"
                  >
                    Option 2
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputCheckbox
                    id="checkbox3"
                    name="checkbox3"
                    value="option3"
                    checked={values.checkbox3 === "option3"}
                    invalid={errors.checkbox1 && touched.checkbox1}
                    valid={!errors.checkbox1 && touched.checkbox1}
                    onChange={handleChange}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label"
                    htmlFor="checkbox3"
                  >
                    Option 3
                  </CLabel>
                </CFormGroup>
                <CInvalidFeedback className="help-block">
                  {errors.checkbox1}
                </CInvalidFeedback>
                <CValidFeedback className="help-block">
                  Input provided
                </CValidFeedback>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>
                  Inline Checkboxes <span className="text-primary">*</span>
                </CLabel>
              </CCol>
              <CCol md="9">
                <CFormGroup
                  variant="custom-checkbox"
                  inline
                  className={
                    errors.inlineCheckbox1 && touched.inlineCheckbox1
                      ? "is-invalid"
                      : ""
                  }
                >
                  <CInputCheckbox
                    custom
                    id="inline-checkbox1"
                    name="inlineCheckbox1"
                    value="option1"
                    innerRef={(ref) => (refs.current.inlineCheckbox1 = ref)}
                    checked={values.inlineCheckbox1 === "option1"}
                    invalid={errors.inlineCheckbox1 && touched.inlineCheckbox1}
                    valid={!errors.inlineCheckbox1 && touched.inlineCheckbox1}
                    onChange={handleChange}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">
                    One
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="inline-checkbox2"
                    name="inlineCheckbox2"
                    value="option2"
                    checked={values.inlineCheckbox2 === "option2"}
                    invalid={errors.inlineCheckbox1 && touched.inlineCheckbox1}
                    valid={!errors.inlineCheckbox1 && touched.inlineCheckbox1}
                    onChange={handleChange}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">
                    Two
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="inline-checkbox3"
                    name="inlineCheckbox3"
                    value="option3"
                    checked={values.inlineCheckbox3 === "option3"}
                    invalid={errors.inlineCheckbox1 && touched.inlineCheckbox1}
                    valid={!errors.inlineCheckbox1 && touched.inlineCheckbox1}
                    onChange={handleChange}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">
                    Three
                  </CLabel>
                </CFormGroup>
                <CInvalidFeedback className="help-block">
                  {errors.inlineCheckbox1}
                </CInvalidFeedback>
                <CValidFeedback className="help-block">
                  Input provided
                </CValidFeedback>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <form onSubmit={handleSubmit} onReset={resetForm}>
            <CButton
              type="submit"
              size="lg"
              color="primary"
              className={`mr-3${isValid ? "" : " disabled"}`}
            >
              Submit
            </CButton>
            <CButton type="reset" color="danger" className="mr-3">
              Reset
            </CButton>
          </form>
        </CCardFooter>
      </CCard>
    </>
  );
};

export default Forms;
