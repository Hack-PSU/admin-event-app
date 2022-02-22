import React, {FC, useEffect} from "react";
import {Button, Screen, Typography} from "components/base";
import {VStack} from "native-base";
import {CodeForm} from "components/actions";
import {useNavigation} from "@react-navigation/native";
import {CodeRoute} from "types";
import {useEvent} from "components/context";
import {useColor} from "assets/styles/theme";

const CodeScreen: FC = () => {
  return (
    <Screen
      withToolbar
      keyboardAvoiding
      scrollEnabled={false}
    >
      <VStack mt="2" px="0.5">
        <Typography bold variant="h2" fontSize="4xl">
          Enter the {"\n"}Code.
        </Typography>
        <CodeForm />
      </VStack>
    </Screen>
  )
}

export default CodeScreen