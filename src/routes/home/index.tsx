import React, {FC} from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeRoute} from "types";
import AdminScreen from "routes/home/admin";
import ScanScreen from "routes/home/actions/scan";
import CodeScreen from "routes/home/actions/code";
import CodeRouter from "routes/home/actions";

const Stack = createNativeStackNavigator()

const HomeRouter: FC = () => {
  return (
    <Stack.Navigator initialRouteName={HomeRoute.Admin} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={HomeRoute.Admin} component={AdminScreen} />
      <Stack.Screen name={HomeRoute.CodeRoute} component={CodeRouter} options={{ presentation: "fullScreenModal" }} />
    </Stack.Navigator>
  )
}

export default HomeRouter