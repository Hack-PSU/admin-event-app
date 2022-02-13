import React, {FC} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Button, ControlledInput, Icon} from "components/base";
import LoginInput, { LoginPasswordInput } from "components/auth/LoginInput";
import {useColor, useMultipleColors} from "assets/styles/theme";
import {InputProps} from "types";

const LoginForm: FC = () => {
  const methods = useForm()
  const colors = useMultipleColors({
    placeholderColor: {
      color: "creamery.500"
    },
    google: {
      color: "blue.500"
    }
  })

  const handleSubmit = () => {
    methods.handleSubmit((data, event) => {
      console.log(data)
    })()
      .then(done => {
        // TODO -- add navigation
      })
  }

  return (
    <FormProvider {...methods}>
      <ControlledInput
        name="email"
        placeholder="Email"
        borderRadius="xl"
        placeholderTextColor={colors.placeholderColor}
        as={LoginInput}
      />
      <ControlledInput
        name="password"
        placeholder="Password"
        mt="2.5"
        borderRadius="xl"
        placeholderTextColor={colors.placeholderColor}
        as={LoginPasswordInput}
      />
      <Button
        onPress={handleSubmit}
        mt="3"
        fontSize="lg"
      >
        Login
      </Button>
    </FormProvider>
  )
}

export default LoginForm