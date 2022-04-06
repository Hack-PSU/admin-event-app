import React, {FC} from 'react'
import { Radio as NativeRadio, Icon as NativeIcon } from 'native-base'
import {ControlledRadioProps, IRadioProps} from "types";
import {useController} from "react-hook-form";
import Typography from "components/base/Typography";
import {useColor} from "assets/styles/theme";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";

const Radio: FC<IRadioProps> = ({ _itemStyle, onChange, icon, name, value, items, ...rest }) => {
  const colors = useColor({
    border: {
      color: "stadium_orange"
    }
  })

  return (
    <NativeRadio.Group
      name={name}
      value={value}
      onChange={onChange}
      {...rest}
    >
      {
        items.map((item, index) => {
          const { value: itemValue, display } = item

          return (
            <NativeRadio
              p={0}
              size="lg"
              borderWidth={value === itemValue ? 0 : undefined}
              borderColor={value === itemValue ? undefined : colors.border}
              value={itemValue}
              colorScheme={"red"}
              key={index}
              {..._itemStyle}
            >
              <Typography variant="sub1" fontSize="md" ml="2.5">
                { display }
              </Typography>
            </NativeRadio>
          )
        })
      }
    </NativeRadio.Group>
  )
}

export const ControlledRadio: FC<ControlledRadioProps> = ({ as: Component, items, name, rules, defaultValue , ...rest }) => {
  const { field: { onBlur, onChange, value } } = useController({ name, rules, defaultValue })

  if (Component) {
    return (
      <Component
        value={value}
        items={items}
        name={name}
        onChange={onChange}
        {...rest}
      />
    )
  }

  return (
    <Radio
      value={value}
      items={items}
      name={name}
      onChange={onChange}
      {...rest}
    />
  )
}

export default Radio