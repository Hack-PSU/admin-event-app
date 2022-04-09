import React, {FC, useEffect, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useFirebase, useNotification} from "components/context";
import {HubRoute} from "types";
import ConsentScreen from "routes/main/hub/consent";
import DraftScreen from "routes/main/hub/draft";
import ReviewScreen from "routes/main/hub/review";
import {AuthPrivilege} from "types/auth";
import {useNavigation} from "@react-navigation/native";
import DraftUserScreen from "routes/main/hub/user";

const Stack = createNativeStackNavigator()

const HubRouter: FC = () => {
  const { showConsent, reset } = useNotification()

  useEffect(() => {
    reset()
  }, [])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={HubRoute.Draft} component={DraftScreen} />
      <Stack.Screen name={HubRoute.Review} component={ReviewScreen} />
      <Stack.Screen name={HubRoute.User} component={DraftUserScreen} />
    </Stack.Navigator>
  )
}

export default HubRouter