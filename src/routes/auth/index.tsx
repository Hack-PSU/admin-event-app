import React, {FC} from 'react'
import {Button, Icon, Screen, Typography} from "components/base";
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
    },
    google: {
      color: "blue.500"
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
        <Button
        mt="16"
        backgroundColor={colors.google}
        leftIcon={<Icon name="google" fill="#ffffff"/>}
      >
        Sign In With Google
      </Button>
      <Button
        mt="3"
        backgroundColor="black"
        leftIcon={<Icon name="github" fill="#ffffff"/>}
      >
        Sign In With GitHub
      </Button>
      </VStack>
    </Screen>
  )
}

export default AuthScreen