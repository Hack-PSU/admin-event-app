import React, {FC} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {CodeRoute, CodeRouterParamList, HomeRoute} from "types";
import ScanScreen from "routes/main/home/actions/scan";
import CodeScreen from "routes/main/home/actions/code";
import SubmitScreen from "routes/main/home/actions/submit";
import {RouteProp, useRoute} from "@react-navigation/native";
import {EventProvider} from "components/context";

const Stack = createNativeStackNavigator()

const CodeRouter: FC = () => {
  const { params } = useRoute<RouteProp<CodeRouterParamList, HomeRoute.CodeRoute>>()

  return (
    <EventProvider fromAdmin={params.params.fromAdmin} eventUid={params.params.eventUid}>
      <Stack.Navigator initialRouteName={CodeRoute.Scan} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={CodeRoute.Scan} component={ScanScreen} />
        <Stack.Screen name={CodeRoute.Code} component={CodeScreen} />
        <Stack.Screen name={CodeRoute.Submit} component={SubmitScreen} />
      </Stack.Navigator>
    </EventProvider>
  )
}

export default CodeRouter