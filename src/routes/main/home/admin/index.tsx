import React, {FC, useEffect, useRef, useState} from "react";
import {Button, Icon, Screen, Toolbar, Typography} from "components/base";
import {useColor} from "assets/styles/theme";
import {Row, VStack} from "native-base";
import {EventList} from "components/admin";
import {useFirebase} from "components/context/FirebaseProvider";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {HomeRoute, HomeRouterParamList, MainRoute} from "types";

const AdminScreen: FC = () => {
  const { params } = useRoute<RouteProp<HomeRouterParamList, HomeRoute.Admin>>()
  const { goBack, navigate } = useNavigation()

  const colors = useColor({
    bg: {
      color: "white",
    },
    button: {
      color: "stadium_orange"
    }
  })

  const onPressBack = () => {
    if (params && params.params && params.params.fromAdmin) {
      // @ts-ignore
      navigate(MainRoute.Menu)
    } else {
      goBack()
    }
  }

  return (
    <Screen
      bgColor={colors.bg}
      px={0}
    >
      <VStack px="0.5">
        <VStack px="5">
          <Toolbar back onPressBack={onPressBack}/>
          <Typography variant="h2" fontSize="4xl" bold mt="5">
            Events.
          </Typography>
        </VStack>
        <EventList />
      </VStack>
    </Screen>
  )
}

export default AdminScreen