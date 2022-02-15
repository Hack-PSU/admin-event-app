import {IBoxProps, IButtonProps, IInputProps, ITextProps} from "native-base";
import {UseControllerProps} from "react-hook-form";
import React from "react";
import {StatusBarStyle} from "react-native";
import {Auth, User} from "firebase/auth";
import {JwtPayload} from "jwt-decode";

type TextStyle = "h1" | "h2" | "h3" | "h4" | "sub1" | "sub2" | "button" | "body1" | "body2" | "caption" | "overline"
type FontStyle = "header" | "sub" | "p"

export type TypographyProps = Omit<ITextProps, "children" | "fontFamily"> & {
  variant: TextStyle
  fontStyle?: FontStyle
  bold?: boolean
  regular?: boolean
  medium?: boolean
}

export type TypographyStyleConfig = Pick<TypographyProps, "variant" | "bold" | "regular" | "medium" | "fontStyle">

export type InputProps = Omit<IInputProps, "InputRightElement" | "placeholder"> & {
  placeholder: IInputProps["placeholder"]
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  password?: boolean
}

export type ControlledInputProps = Omit<InputProps, "children" | "placeholder"> & UseControllerProps & {
  as?: React.FC<InputProps>
  password?: boolean
  placeholder: string
}

export type ScreenProps = IBoxProps & {
  keyboardAvoiding?: boolean
  withToolbar?: boolean
  top?: number
  left?: number
  right?: number
  bottom?: number
  statusBarStyle?: StatusBarStyle
  bgImage?: any
  scrollEnabled?: boolean
}

export type ButtonProps = Omit<IButtonProps, "children"> & Partial<Pick<ITextProps, "fontSize">> & {
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  color?: string
  disabled?: boolean
}

export interface IActionCardProps {
  onPress(): void
  icon: JSX.Element
}

export interface Event {
  title: string
  startTime: number
  endTime: number
  uid: string
}

export interface IEventCardProps {
  event: Event
}

export interface IToolbarProps {
  color?: string
  close?: boolean
  back?: boolean
  width?: number
  height?: number
}

export interface IFirebaseProvider {
  auth: Auth
}

export interface IFirebaseProviderHooks {
  loginWithEmailAndPassword(email: string, password: string): Promise<void>
  logout(): Promise<void>
  authenticated: boolean
  user?: User
  error: FirebaseError
}

export interface JwtToken extends JwtPayload {
  privilege?: number
}

export enum FirebaseError {
  NO_PERMISSION,
  MISSING_EMAIL,
  INVALID,
  NONE
}