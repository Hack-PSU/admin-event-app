import React, {FC} from "react";
import { Select as SelectBase } from "native-base";
import {ControlledSelectProps, SelectProps} from "types";
import {useController} from "react-hook-form";
import {useColor} from "assets/styles/theme";

const Select: FC<SelectProps> = ({ items, placeholder, placeholderTextColor, borderColor, width, fontSize, children, ...rest }) => {
  const colors = useColor({
    borderColor: {
      color: "stadium_orange"
    }
  })

  return (
    <SelectBase
      py="2.5"
      px="3"
      fontSize={fontSize ?? "sm"}
      width={width ?? "100%"}
      borderColor={borderColor ?? colors.borderColor}
      borderRadius="md"
      placeholderTextColor={placeholderTextColor ?? colors.borderColor}
      variant="unstyled"
      borderWidth="2"
      placeholder={placeholder}
      {...rest}
    >
      {items.map(({ label, value }, index) => (
        <SelectBase.Item label={label} value={value} key={`${value}-${index}`} />
      ))}
    </SelectBase>
  )
}

export const ControlledSelect: FC<ControlledSelectProps> = ({ as: Component, placeholder, items, name, rules, defaultValue, ...rest }) => {
  const { field: { onBlur, onChange, value } } = useController({ name, rules, defaultValue })

  if (Component) {
    return (
      <Component
        onValueChange={onChange}
        selectedValue={value}
        placeholder={placeholder}
        items={items}
        {...rest}
      />
    )
  }

  return (
    <Select
      onValueChange={onChange}
      selectedValue={value}
      placeholder={placeholder}
      items={items}
      {...rest}
    />
  )

}

export default Select