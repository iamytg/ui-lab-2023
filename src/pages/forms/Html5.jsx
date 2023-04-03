import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FormItem, FormVContext } from "./FormValidations";

const Html5 = () => {
  const methods = useForm({ mode: "all" });

  const cardRef = useRef();
  const [contextValue, setContextValue] = useState({
    nodeList: [],
    names: [],
    nativeValidation: true,
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
          <CardHeader title="HTML5 Native" />
          <CardContent>
            <Stack spacing={3}>
              <FormItem label="Text Input" name="text" />
              <FormItem label="Email Input" name="email" type="email" />
              <FormItem label="Password" name="password" type="password" />
            </Stack>
          </CardContent>
          <CardActions>
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

export default Html5;
