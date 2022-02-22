import React, {FC, useEffect, useRef, useState} from "react";
import {Button, Icon, Screen, Typography} from "components/base";
import {useColor} from "assets/styles/theme";
import {Row, VStack} from "native-base";
import {EventList} from "components/admin";
import {useFirebase} from "components/context/FirebaseProvider";

const AdminScreen: FC = () => {
  const { logout } = useFirebase()
  const colors = useColor({
    bg: {
      color: "white",
    },
    button: {
      color: "stadium_orange"
    }
  })

  const onPressLogout = async () => {
    await logout()
  }

  return (
    <Screen
      bgColor={colors.bg}
      px={0}
    >
      <VStack px="0.5">
        <VStack px="5">
          <Row width="full" justifyContent="space-between">
            <Typography variant="h2" bold>
              Workshops.
            </Typography>
            <Button
              backgroundColor={colors.button}
              onPress={onPressLogout}
              rounded='2xl'
              width="40%"
              leftIcon={<Icon name="log-out-outline" fill="#ffffff" width={25} height={25} />}
              leftIconMl="0"
            >
              Logout
            </Button>
          </Row>
          <Typography variant="h4" mt="10">
            Events
          </Typography>
        </VStack>
        <EventList />
      </VStack>
    </Screen>
  )
}

export default AdminScreen