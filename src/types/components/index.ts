import {
  IBoxProps,
  IButtonProps,
  IInputProps,
  IRadioGroupProps,
  ITextProps,
  IRadioProps as INativeRadioProps,
  ISelectProps
} from "native-base";
import {UseControllerProps} from "react-hook-form";
import React from "react";
import {StatusBarStyle} from "react-native";
import {Auth, User} from "firebase/auth";
import {JwtPayload} from "jwt-decode";
import {AxiosInstance} from "axios";
import {IconProps} from "react-native-eva-icons";

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
  leftIconMl?: ITextProps["ml"]
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
  onNavigateScan?(): void
  onNavigateCode?(): void
  event: Event
}

export interface IToolbarProps {
  color?: string
  close?: boolean
  back?: boolean
  width?: number
  height?: number
  right?: boolean
  onPressBack?(): void
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
  token: string
  validatePermissions(privilege: number): boolean
}

export interface JwtToken extends JwtPayload {
  privilege?: number
}

export enum FirebaseError {
  NO_PERMISSION,
  MISSING_EMAIL,
  WRONG_PASSWORD,
  INVALID,
  NONE
}

export interface ICheckInWorkshopResp {
  result: "Success" | "Error"
  data: any
}

export interface IApiProviderHooks {
  api?: AxiosInstance
  checkInWorkshop(event_id: string, user_pin: string): Promise<{ valid: boolean, status: number }>
  getEvents(): Promise<IEventItem[]>
}

export interface IApiProviderProps {
  baseURL: string
}

export interface ILottieProps {
  loop?: boolean
  play?: boolean
  stop?: boolean
  source: any
  width?: number
  height?: number
  autoPlay?: boolean
}

export type SubmissionStatus = "submit" | "success" | "error" | "duplicate"

export interface IStatusProps {
  status: SubmissionStatus
}

export interface IStatusButtonProps {
  onPressHome(): void
  onPressBack(): void
  onPressEvents(): void
}

export interface IEventProviderProps {
  eventUid: string
  fromAdmin: boolean
}

export interface IEventProviderHooks {
  eventUid: string
  userPin: string
  update(action: "event" | "user", payload: string): void
  fromAdmin: boolean
}

export type EventType = "food" | "activity" | "workshop"

export interface IEventItem {
  uid: string
  title: string
  startTime: number
  endTime: number
  type: EventType
}

interface INotificationMetadata {
  link: string
}

export interface INotificationResponse {
  status: string
  message: string
  data: {
    id: string
    data: Pick<INotificationPayload, "title" | "message">
    type: "topic" | "broadcast"
    to: string
  }
}

export interface INotificationPayload {
  title: string
  message: string
  metadata?: INotificationMetadata
  isScheduled?: boolean
  scheduleTime?: number
}

export type NotificationRequest = INotificationPayload & {
  type: "broadcast" | "topic"
  to: "all" | string
}

export interface INotificationProviderHooks {
  showConsent: boolean
  createNotification(to: "all" | string, payload: INotificationPayload, topicDisplay?: string): void
  sendNotification(): Promise<INotificationResponse>
  request: NotificationRequest
  topicDisplay: string
}

export interface INotificationProviderProps {
  baseURL: string
}

export type RadioItem = {
  value: string
  display: string
}

export interface IRadioProps extends Omit<IRadioGroupProps, "value"> {
  items: RadioItem[]
  icon?: JSX.Element
  value: string
  _itemStyle?: Omit<INativeRadioProps, "icon" | "wrapperRef" | "value">
}

export type ControlledRadioProps = Omit<IRadioProps, "children" | "value" | "onChange"> & UseControllerProps & {
  as?: React.FC<IRadioProps>
}

export interface ISelectItem {
  label: string
  value: string
}

export type SelectProps = Omit<ISelectProps, "children" | "placeholder"> & {
  placeholder: string
  items: ISelectItem[]
}

export type ControlledSelectProps = SelectProps & UseControllerProps & {
  as?: React.FC<SelectProps>
}

export type Filter = "all" | EventType