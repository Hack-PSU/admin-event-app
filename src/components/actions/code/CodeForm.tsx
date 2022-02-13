import React, {FC} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {ControlledInput} from "components/base";
import CodeInput from "components/actions/code/CodeInput";

const CodeForm: FC = () => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <ControlledInput
        mt="2"
        name="code"
        placeholder="Pin_123"
        as={CodeInput}
      />
    </FormProvider>
  )
}

export default CodeForm