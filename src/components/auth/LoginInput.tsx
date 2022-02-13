import React, {FC} from "react";
import {InputProps} from "types";
import {useColor, useMultipleColors} from "assets/styles/theme";
import {PasswordInput, Input} from "components/base";


const LoginInput: FC<InputProps> = ({ password, ...props }) => {
  const colors = useMultipleColors({
    bg: {
      color: "white"
    },
    border: {
      color: "hacky_blue"
    }
  })

  if (password) {
    return (
      <PasswordInput
        backgroundColor={colors.bg}
        borderColor={colors.border}
        py="4"
        borderRadius="lg"
        iconFill="#6A85B9"
        {...props}
      />
    )
  }

  return (
    <Input
      backgroundColor={colors.bg}
      borderColor={colors.border}
      autoCapitalize="none"
      autoCompleteType="email"
      borderRadius="lg"
      py="4"
      {...props}
    />
  )
}

export const LoginPasswordInput: FC<InputProps> = ({ ...props }) => {
  return (
    <LoginInput
      password
      placeholder="Password"
      {...props}
    />
  )
}

export default LoginInput