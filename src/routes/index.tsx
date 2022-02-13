import React, {FC} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootRoute} from "types";
import HomeRouter from "routes/home";
import AuthScreen from "routes/auth";
import {useFirebase} from "components/context/FirebaseProvider";
import firebase from "firebase/app";

const Stack = createNativeStackNavigator()

const Root: FC = () => {

  return (
      <Stack.Navigator initialRouteName={RootRoute.HomeRoute} screenOptions={{ headerShown: false }}>
          <Stack.Screen name={RootRoute.Auth} component={AuthScreen} />
          <Stack.Screen name={RootRoute.HomeRoute} component={HomeRouter} />
      </Stack.Navigator>
  )
}

export default Root