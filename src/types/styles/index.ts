export interface IUseColorConfig {
  color: "stadium_orange" | "creamery" | "university_blue" | "hacky_blue" | "black" | "white" | string
  opacity?: number
}

type UseSingleColor = IUseColorConfig
type UseSingleColorReturn = string

export type UseMultipleColors = {
  [K: string]: IUseColorConfig
}

export type UseMultipleColorsReturn<C extends keyof UseMultipleColors> = {
  [K in C]: string
}

export type UseSingleColorProps = (config: UseSingleColor) => UseSingleColorReturn
export type UseMultipleColorProps = (config: UseMultipleColors) => UseMultipleColorsReturn<keyof typeof config>

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
