export interface IUseColorConfig {
  color: "stadium_orange" | "creamery" | "university_blue" | "hacky_blue" | "success" | "black" | "white" | string
  shade?: "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
  opacity?: number
}

type UseSingleColorConfig = IUseColorConfig
type UseSingleColorReturn = string

export type UseColorConfig = {
  [K: string]: IUseColorConfig
}

export type UseColorReturn<C extends keyof UseColorConfig> = {
  [K in C]: string
}

export type UseColorHook = (config: UseColorConfig) => UseColorReturn<keyof typeof config>

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
