export interface IUseColorConfig {
  color: "stadium_orange" | "creamery" | "university_blue" | "hacky_blue" | "black" | "white" | string
  shade?: "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
  opacity?: number
}

type UseSingleColorConfig = IUseColorConfig
type UseSingleColorReturn = string

export type UseMultipleColorsConfig = {
  [K: string]: IUseColorConfig
}

export type UseMultipleColorsReturn<C extends keyof UseMultipleColorsConfig> = {
  [K in C]: string
}

export type UseSingleColorProps = (config: UseSingleColorConfig) => UseSingleColorReturn
export type UseMultipleColorProps = (config: UseMultipleColorsConfig) => UseMultipleColorsReturn<keyof typeof config>

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
