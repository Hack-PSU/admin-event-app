import {ParamListBase} from "@react-navigation/routers";

export enum RootRoute {
    Auth = "Auth",
    HomeRoute = "Home"
}

export enum HomeRoute {
    Admin = "Admin",
    CodeRoute = "CodeRouter"
}

export enum CodeRoute {
    Scan = "Scan",
    Code = "Code",
    Submit = "Submit"
}

type CodeRouteParam = {
    eventUid: string
}

type SubmitRouteParam = CodeRouteParam & {
    userPin: string
}

type CodeRouterParam = {
    screen: string
    params: CodeRouteParam
}

export interface CodeRouterParamList extends ParamListBase {
    [HomeRoute.CodeRoute]: CodeRouterParam
}

export interface CodeRouteParamList extends ParamListBase {
    [CodeRoute.Code]: CodeRouteParam
    [CodeRoute.Scan]: CodeRouteParam
    [CodeRoute.Submit]: SubmitRouteParam
}


