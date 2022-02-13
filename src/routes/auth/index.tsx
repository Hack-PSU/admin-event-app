import React, {FC} from 'react'
import {Screen, Typography} from "components/base";
import {useColor, useMultipleColors} from "assets/styles/theme";
import {Box, Center, Image, VStack} from "native-base";
import {useWindowDimensions} from "react-native";
import {LoginForm} from "components/auth";

const BgImage: FC = () => {
  const { width, height } = useWindowDimensions()

  return (
    <VStack h={height} flexDirection="column-reverse">
      <Image
        source={require("assets/images/mountain.png")}
        resizeMode="center"
        w="full"
        h="3xs"
        alt="Mountains Background"
      />
    </VStack>
  )
}

const AuthScreen: FC = () => {
  const colors = useMultipleColors({
    bg: {
      color: "white"
    },
    text: {
      color: "stadium_orange"
    }
  })

  return (
    <Screen
      backgroundColor={colors.bg}
      keyboardAvoiding
      bgImage={<BgImage />}
    >
      <VStack px="5" pt="5">
        <Center>
          <Image
            source={require("assets/images/logo.png")}
            w="48"
            h="48"
            alt="HackPSU Logo"
          />
        </Center>
        <Typography mt="3" variant="h1" fontSize="4xl">LOGIN</Typography>
        <LoginForm />
      </VStack>
    </Screen>
  )
}

export default AuthScreen