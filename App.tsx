import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { NativeBaseProvider } from 'native-base'
import {useFonts, Roboto_400Regular} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import Root from "routes/index";
import {theme} from "assets/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    "CornerStone": require("./assets/fonts/Cornerstone.ttf"),
    "SpaceGrotesk_Regular": require("./assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk_SemiBold": require("./assets/fonts/SpaceGrotesk-SemiBold.ttf"),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Root />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

