import React, {FC, useCallback, useState} from "react";
import {ControlledInputProps, InputProps} from "types";
import {Input as NativeInput, Icon as NativeIcon} from "native-base";
import Icon from './Icon';
import {useController} from "react-hook-form";

const Input: FC<InputProps> = ({ children, fontSize, width, placeholder, leftIcon, rightIcon, placeholderTextColor, borderColor, ...props }) => {
  return (
    <NativeInput
      py="2.5"
      px="3"
      fontSize={fontSize ?? "sm"}
      width={width ?? "full"}
      borderColor={borderColor}
      borderRadius="md"
      placeholderTextColor={placeholderTextColor}
      InputLeftElement={
        leftIcon &&
        <NativeIcon
          as={leftIcon}
          ml="2.5"
        />
      }
      InputRightElement={
        rightIcon &&
        <NativeIcon
          as={rightIcon}
          mr="2.5"
        />
      }
      _focus={{
        borderColor: borderColor
      }}
      variant="unstyled"
      borderWidth="2"
      placeholder={placeholder}
      {...props}
    />
  )
}

export const PasswordInput: FC<Omit<InputProps, "type" | "autoCapitalize" | "placeholder" | "children" | "rightIcon"> & { iconFill?: string }> = ({ iconFill, ...props }) => {
  const [hide, setHide] = useState<boolean>(true)

  const PasswordIcon = useCallback(() => {
    if (hide) {
      return <Icon fill={iconFill} onPress={() => setHide(false)} name="eye-off-outline" />
    } else {
      return <Icon fill={iconFill} onPress={() => setHide(true)} name="eye-outline" />
    }
  }, [hide])

  return (
    <Input
      type={hide ? "password" : "text"}
      autoCapitalize="none"
      placeholder="Password"
      rightIcon={PasswordIcon()}
      {...props}
    />
  )
}

export const ControlledInput: FC<ControlledInputProps> = ({ placeholder, password, as: Component, name, control, rules, defaultValue, ...props }) => {
  const { field: { onBlur, onChange, value } } = useController({ name, rules, defaultValue })

  if (password) {
    return <PasswordInput
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      password
      {...props}
    />
  }

  if (Component) {
    return (
      <Component
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        {...props}
      />
    )
  }

  return (
    <Input
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default Input