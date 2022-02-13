import React, {FC} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {CodeRoute} from "types";
import ScanScreen from "routes/home/actions/scan";
import CodeScreen from "routes/home/actions/code";

const Stack = createNativeStackNavigator()

const CodeRouter: FC = () => {
  return (
    <Stack.Navigator initialRouteName={CodeRoute.Scan} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={CodeRoute.Scan} component={ScanScreen} />
      <Stack.Screen name={CodeRoute.Code} component={CodeScreen} />
    </Stack.Navigator>
  )
}

export default CodeRouter