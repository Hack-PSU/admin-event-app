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
    Code = "Code"
}

type CodeRouteParam = {
    eventId: string
}

export interface CodeRouteParamList extends ParamListBase {
    [CodeRoute.Code]: CodeRouteParam
    [CodeRoute.Scan]: CodeRouteParam
}