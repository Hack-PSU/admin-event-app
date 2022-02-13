import React, {FC} from "react";
import {Button as NativeButton, Icon as NativeIcon} from "native-base";
import {ButtonProps} from "types/components";
import Typography from "components/base/Typography";
import {useColor, useMultipleColors, useShadow} from "assets/styles/theme";

const Button: FC<ButtonProps> = ({ leftIcon, rightIcon, children, backgroundColor, color, fontSize, variant, disabled, ...props }) => {
  const colors = useMultipleColors({
    bg: {
      color: "stadium_orange"
    },
    text: {
      color: "white"
    }
  })

  return (
    <NativeButton
      backgroundColor={backgroundColor ?? colors.bg}
      width="100%"
      borderRadius={13}
      leftIcon={
        leftIcon &&
        <NativeIcon
          ml="2.5"
          as={leftIcon}
        />
      }
      rightIcon={
        rightIcon &&
        <NativeIcon
          ml="2.5"
          as={rightIcon}
        />
      }
      py="2.5"
      {...props}
    >
      {children &&
        <Typography variant="h2" bold color={color ?? colors.text} fontSize={fontSize}>
          { children }
        </Typography>
      }
    </NativeButton>
  )
}

// export const NextButton: FC<ButtonProps> = ({ variant, ...rest }) => <Button variant={variant} {...rest}>Next</Button>
// export const ShadowButton: FC<Omit<ButtonProps, "shadow">> = ({ children, variant, ...rest }) => <Button variant={variant} style={useShadow()} {...rest}>{ children }</Button>
export default Button