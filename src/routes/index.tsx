import React, {FC} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootRoute} from "types";
import HomeRouter from "routes/main/home";
import AuthScreen from "routes/auth";
import {useFirebase} from "components/context/FirebaseProvider";
import MainRouter from "routes/main";

const Stack = createNativeStackNavigator()

const Root: FC = () => {
  const { authenticated } = useFirebase()

  return (
      <Stack.Navigator initialRouteName={RootRoute.Auth} screenOptions={{ headerShown: false }}>
        { !authenticated ?
          <Stack.Screen name={RootRoute.Auth} component={AuthScreen}/>
          :
          <Stack.Screen name={RootRoute.Main} component={MainRouter} />
        }
      </Stack.Navigator>
  )
}

export default Root