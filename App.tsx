import React, {useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { NativeBaseProvider } from 'native-base'
import {useFonts, Roboto_400Regular} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import Root from "routes/index";
import {theme} from "assets/styles/theme";

import {FirebaseProvider, ApiProvider, NotificationProvider} from "components/context";
import {getEnvironment} from "./config/release";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {Image} from "react-native";
import {Asset} from "expo-asset";
import {QueryClient, QueryClientProvider} from "react-query";

const config = getEnvironment("prod")
initializeApp(config)

const auth = getAuth()

const cacheImages = (images: any[]): any[] => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

const client = new QueryClient()

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    "CornerStone": require("./assets/fonts/Cornerstone.ttf"),
    "SpaceGrotesk_Regular": require("./assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk_SemiBold": require("./assets/fonts/SpaceGrotesk-SemiBold.ttf"),
  })
  const [isReady, setIsReady] = useState(false)

  const _loadAssetAsync = async () => {
    const imageAssets = cacheImages([
      require("assets/images/region.svg"),
      require("assets/images/logo.png"),
      require("assets/images/mountain.png"),
      require("assets/lottie/submitting.json"),
      require("assets/lottie/loading-2.json"),
      require("assets/lottie/error.json"),
      require("assets/lottie/success.json")
    ])

    await Promise.all([...imageAssets])
  }

  if (!fontsLoaded || !isReady) {
    return (
      <AppLoading
        startAsync={_loadAssetAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <FirebaseProvider auth={auth}>
          <QueryClientProvider client={client}>
          <ApiProvider baseURL={config.baseURL}>
            <NotificationProvider baseURL={config.notificationBaseURL}>
              <Root />
            </NotificationProvider>
          </ApiProvider>
          </QueryClientProvider>
        </FirebaseProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

