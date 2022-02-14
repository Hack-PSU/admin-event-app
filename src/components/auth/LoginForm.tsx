import React, {FC} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Button, ControlledInput} from "components/base";
import LoginInput, { LoginPasswordInput } from "components/auth/LoginInput";
import {useColor} from "assets/styles/theme";
import {useFirebase} from "components/context/FirebaseProvider";

const LoginForm: FC = () => {
  const methods = useForm()
  const { loginWithEmailAndPassword } = useFirebase()

  const {colors} = useColor({
    placeholderColor: {
      color: "creamery.500"
    },
    google: {
      color: "blue.500"
    }
  })

  const handleSubmit = () => {
    methods.handleSubmit(async (data, event) => {
      await loginWithEmailAndPassword(data.email, data.password)
    })()
      .then(done => {
        // navigation done by root router
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