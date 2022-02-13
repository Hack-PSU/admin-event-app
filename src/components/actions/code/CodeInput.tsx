import React, {FC} from "react";
import {InputProps} from "types";
import {Input} from "components/base";
import {useMultipleColors} from "assets/styles/theme";

const CodeInput: FC<InputProps> = (props) => {
  const colors = useMultipleColors({
    placeholder: {
      color: "creamery",
      shade: "100"
    },
    input: {
      color: "stadium_orange"
    }
  })

  return (
    <Input
      borderColor="transparent"
      py="0"
      px="0"
      fontSize="4xl"
      fontWeight="bold"
      placeholderTextColor={colors.placeholder}
      color={colors.input}
      autoCompleteType="off"
      autoCorrect={false}
      type="text"
      {...props}
    />
  )
}

export default CodeInput