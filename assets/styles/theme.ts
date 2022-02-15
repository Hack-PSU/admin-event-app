import {extendTheme, useToken} from "native-base";
import {
  IUseColorConfig,
  IUseShadowProps,
  UseColorHook,
} from "types";
import {useMemo} from "react";
import {StyleSheet} from "react-native";

export const theme = extendTheme({
  colors: {
    university_blue: {
      50: '#e5f4ff',
      100: '#bfdbf2',
      200: '#98c4e7',
      300: '#71acdd',
      400: '#4b94d3',
      500: '#347bba',
      600: '#275f90',
      700: '#1b4468',
      800: '#0d2940',  // default
      900: '#000f19',
    },
    hacky_blue: {
      50: '#e9f1ff',
      100: '#c8d4ec',
      200: '#a6b8d9',
      300: '#859cc7',
      400: '#637fb6',  // default
      500: '#49669c',
      600: '#384f7a',
      700: '#273859',
      800: '#142238',
      900: '#030b19',
    },
    creamery: {
      50: '#f2f2f2',  // default
      100: '#d9d9d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#262626',
      900: '#0d0d0d',
    },
    stadium_orange: {
      50: '#ffe8e1',
      100: '#ffc2b4',
      200: '#fa9c85',
      300: '#f67456',
      400: '#f24e27',  // default
      500: '#d8340d',
      600: '#a92809',
      700: '#791b05',
      800: '#4b0e00',
      900: '#1f0200',
    },
    success: {
      50: '#e4fce9',
      100: '#c1eecb',
      200: '#9ce2ac',
      300: '#76d58c',
      400: '#50c96c',
      500: '#36af53',
      600: '#28883f',
      700: '#1a612c',
      800: '#0c3b19',
      900: '#001502',
    },
    black: "#1a1a1a",
    white: "#ffffff"
  }
})

const generateColor = (config: IUseColorConfig) => {
  const { color, opacity, shade } = config
  let colorString;

  switch (color) {
    case "stadium_orange":
      colorString = "stadium_orange"
      if (shade) {
        colorString += `.${shade}`
      } else {
        colorString += ".400"
      }
      break;
    case "creamery":
      colorString = "creamery"
      if (shade) {
        colorString += `.${shade}`
      } else {
        colorString += ".50"
      }
      break;
    case "university_blue":
      colorString = "university_blue"
      if (shade) {
        colorString += `.${shade}`
      } else {
        colorString += ".800"
      }
      break;
    case "hacky_blue":
      colorString = "hacky_blue"
      if (shade) {
        colorString += `.${shade}`
      } else {
        colorString += ".400"
      }
      break;
    case "black":
      colorString = "black"
      break;
    case "white":
      colorString = "white"
      break;
    default:
      colorString = color
      if (shade) {
        colorString += `.${shade}`
      } else if (!color.includes(".")) {
        colorString += `.500`
      }
      break;
  }

  if (opacity) {
    colorString += `:alpha.${opacity}`
  }

  return colorString
}

export const useColor: UseColorHook = (config) => {
  return useMemo(() =>
    Object.entries(config).reduce(
      (colors, [key, colorConfig]) => {
        colors[key] = generateColor(colorConfig)
        return colors
      }, {} as { [K in keyof typeof config]: string }),
    [config])
}

export const useShadow = (options?: IUseShadowProps) => {
  const baseShadow = {
    shadowOffset: {
      width: 0,
      height: 3.5
    },
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOpacity: 0.15,
    elevation: 2
  }

  if (options) {
    const {opacity, offset, radius, color, elevation} = options

    return useMemo(() => StyleSheet.create({
      shadow: {
        shadowOffset:
          offset ?
            {
              width: offset.width ?? baseShadow.shadowOffset.width,
              height: offset.height ?? baseShadow.shadowOffset.height
            }
            :
            baseShadow.shadowOffset,
        shadowColor: color ?? baseShadow.shadowColor,
        shadowRadius: radius ?? baseShadow.shadowRadius,
        shadowOpacity: opacity ?? baseShadow.shadowOpacity,
        elevation: elevation ?? baseShadow.elevation
      }
    }).shadow, [options])
  } else {
    return useMemo(() => StyleSheet.create({
      shadow: baseShadow
    }).shadow, [options])
  }
}
