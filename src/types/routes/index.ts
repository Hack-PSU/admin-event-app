import {ParamListBase} from "@react-navigation/routers";

export enum RootRoute {
    Auth = "Auth",
    Main = "MainRouter"
}

export enum MainRoute {
    Menu = "Menu",
    Home = "Home",
    Hub = "Hub"
}

export enum HomeRoute {
    Admin = "Admin",
    CodeRoute = "CodeRouter"
}

export enum HubRoute {
    Consent = "Consent",
    Draft = "Draft",
    Review = "Review"
}

export enum CodeRoute {
    Scan = "Scan",
    Code = "Code",
    Submit = "Submit"
}

type CodeRouteParam = {
    eventUid: string
    fromAdmin: boolean
}

type SubmitRouteParam = CodeRouteParam & {
    userPin: string
}

type CodeRouterParam = {
    screen: string
    params: CodeRouteParam
}

type AdminRouteParam = {
    params: {
        fromAdmin: boolean
    }
}

export interface CodeRouterParamList extends ParamListBase {
    [HomeRoute.CodeRoute]: CodeRouterParam
}

export interface HomeRouterParamList extends ParamListBase {
    [HomeRoute.Admin]: AdminRouteParam
}

export interface CodeRouteParamList extends ParamListBase {
    [CodeRoute.Code]: CodeRouteParam
    [CodeRoute.Scan]: CodeRouteParam
    [CodeRoute.Submit]: SubmitRouteParam
}


