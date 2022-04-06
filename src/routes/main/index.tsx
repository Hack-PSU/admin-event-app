import React, {FC} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {MainRoute} from "types";
import HomeRouter from "routes/main/home";
import BottomNavigationTab from "components/base/BottomNavigationTab";
import HubRouter from "routes/main/hub";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MenuScreen from "routes/main/menu";

const Stack = createNativeStackNavigator()

const MainRouter: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={MainRoute.Menu} component={MenuScreen} />
      <Stack.Screen name={MainRoute.Home} component={HomeRouter} />
      <Stack.Screen name={MainRoute.Hub} component={HubRouter} />
    </Stack.Navigator>
  )
}

export default MainRouter