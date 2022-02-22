import React, {FC} from 'react'
import {Button, Icon, Screen, Typography} from "components/base";
import {useColor} from "assets/styles/theme";
import {Box, Center, Image, Row, VStack} from "native-base";
import {useWindowDimensions} from "react-native";
import {LoginForm} from "components/auth";
import {useFirebase} from "components/context/FirebaseProvider";
import {FirebaseError} from "types";

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

const getErrorMessage = (error: FirebaseError) => {
  switch (error) {
    case FirebaseError.NO_PERMISSION:
      return "Unauthorized credentials"
    case FirebaseError.MISSING_EMAIL:
      return "Email is required"
    case FirebaseError.INVALID:
      return "Incorrect email or password"
    case FirebaseError.NONE:
      break;
  }
}

const AuthScreen: FC = () => {
  const colors = useColor({
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

  const { error } = useFirebase()

  return (
    <Screen
      backgroundColor={colors.bg}
      keyboardAvoiding
      bgImage={<BgImage />}
      scrollEnabled={false}
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
        <Row alignItems="center" justifyContent="space-between">
          <Typography mt="3" variant="h1" fontSize="4xl">LOGIN</Typography>
          { error !== FirebaseError.NONE ?
            <Row alignItems="center">
              <Icon name="alert-triangle" color="#F3603D" width={25} height={25} />
              <Typography variant="h2" bold fontSize="sm" ml="1" color={colors.text}>
                { getErrorMessage(error) }
              </Typography>
            </Row>
            :
            null
          }
        </Row>
        <LoginForm />
      </VStack>
    </Screen>
  )
}

export default AuthScreen