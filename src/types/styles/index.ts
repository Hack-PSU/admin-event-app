export interface IUseColorConfig {
  color: "stadium_orange" | "creamery" | "university_blue" | "hacky_blue" | "black" | "white" | string
  shade?: "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
  opacity?: number
}

type UseSingleColorConfig = IUseColorConfig
type UseSingleColorReturn = string

export type UseColorConfig = {
  [K: string]: IUseColorConfig
}

export type UseColorFormat = {
  [K: string]: string
}

export type UseColorValues = {
  values: UseColorFormat
}

export interface IUseColorReturn {
  colors: UseColorFormat
  values: UseColorFormat
}

export type UseColorHook = (config: UseColorConfig) => { colors: UseColorFormat, values: UseColorFormat  }

export interface IUseShadowProps {
  offset?: {
    width?: number,
    height?: number
  },
  color?: string
  radius?: number,
  opacity?: number,
  elevation?: number
}
