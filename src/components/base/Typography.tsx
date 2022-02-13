import React, {FC} from "react";
import {TypographyProps, TypographyStyleConfig} from "types";
import {Text} from "native-base";

const sizeToResponsive = {
  "34": "3xl",
  "24": "2xl",
  "20": "xl",
  "16": "lg",
  "14": "md",
  "12": "sm",
  "10": "xs"
}

const getFontFamily = (config: Omit<TypographyStyleConfig, "variant">) => {
  const { fontStyle, regular, medium, bold } = config
  switch (fontStyle) {
    case "header":
      return "CornerStone"
    case "sub":
      if (bold) {
        return "SpaceGrotesk_SemiBold"
      }
      return "SpaceGrotesk_Regular"
    case "p":
      return "Roboto_400Regular"
  }
}

const getDefaultStyles = (config: TypographyStyleConfig) => {
  const { bold, regular, medium, fontStyle, variant } = config

  const styles = {
    fontFamily: getFontFamily({ bold, fontStyle, medium, regular }),
  }

  switch (variant) {
    case "h1":
      return {
        ...styles,
        fontFamily: getFontFamily({ bold, regular, medium, fontStyle: "header" }),
        fontStyle: "normal",
        fontSize: sizeToResponsive["34"],
        lineHeight: "md"
      }
    case "h2":
      return {
        ...styles,
        fontFamily: getFontFamily({ bold, regular, medium, fontStyle: "sub" }),
        fontStyle: "normal",
        fontSize: sizeToResponsive["34"],
        lineHeight: "md",
        letterSpacing: .25
      }
    case "h3":
      return {
        ...styles,
        fontFamily: getFontFamily({ bold, regular, medium, fontStyle: "sub" }),
        fontStyle: "normal",
        fontSize: sizeToResponsive["24"],
        lineHeight: "sm"
      }
    case "h4":
      return {
        ...styles,
        fontFamily: getFontFamily({ bold, regular, medium, fontStyle: "sub" }),
        fontStyle: "normal",
        fontSize: sizeToResponsive["20"],
        lineHeight: "sm",
        letterSpacing: .15
      }
    case "sub1":
      return {
        ...styles,
        fontFamily: getFontFamily({ bold, regular, medium, fontStyle: "sub" }),
        fontStyle: "normal",
        fontSize: sizeToResponsive["16"],
        lineHeight: "md",
        letterSpacing: .15
      }
    case "sub2":
      return {
        ...styles,
        fontFamily: getFontFamily({ bold, regular, medium, fontStyle: "p" }),
        fontStyle: "normal",
        fontSize: sizeToResponsive["14"],
        lineHeight: "sm",
        letterSpacing: .1
      }
    case "button":
      return {
        ...styles,
        fontFamily: getFontFamily({ bold, regular, medium, fontStyle: "p" }),
        fontStyle: "normal",
        fontSize: sizeToResponsive["14"],
        lineHeight: "md",
        letterSpacing: 1.2
      }
    case "body1":
      return {
        ...styles,
        fontFamily: getFontFamily({ bold, regular, medium, fontStyle: "p" }),
        fontStyle: "normal",
        fontSize: sizeToResponsive["16"],
        lineHeight: "md",
        letterSpacing: .44
      }
    case "body2":
      return {
        ...styles,
        fontFamily: getFontFamily({ bold, regular, medium, fontStyle: "p" }),
        fontStyle: "normal",
        fontSize: sizeToResponsive["14"],
        lineHeight: "sm",
        letterSpacing: .25
      }
    case "caption":
      return {
        ...styles,
        fontFamily: getFontFamily({ bold, regular, medium, fontStyle: "p" }),
        fontStyle: "normal",
        fontSize: sizeToResponsive["12"],
        lineHeight: "xs",
        letterSpacing: .5
      }
    case "overline":
      return {
        ...styles,
        fontFamily: getFontFamily({ bold, regular, medium, fontStyle: "p" }),
        fontStyle: "normal",
        fontSize: sizeToResponsive["10"],
        lineHeight: "xs",
        letterSpacing: 1.2
      }
  }
}

const Typography: FC<TypographyProps> = ({ children, variant, regular, bold, medium, fontStyle, ...props }) => {
  const defaultStyles = getDefaultStyles({ variant, bold, fontStyle, medium, regular })

  return (
    <Text
      {...defaultStyles}
      {...props}
    >
      { children }
    </Text>
  )
}

export default Typography