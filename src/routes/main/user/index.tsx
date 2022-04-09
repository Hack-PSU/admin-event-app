import React, {FC} from "react";
import {Screen, Toolbar, Typography} from "components/base";
import {useColor} from "assets/styles/theme";
import {VStack} from "native-base";
import UserForm from "components/user/UserForm";

const UserScreen: FC = () => {
  const colors = useColor({
    bg: {
      color: "white"
    }
  })

  return (
    <Screen
      bgColor={colors.bg}
      keyboardAvoiding
    >
      <VStack px="0.5">
        <Toolbar back/>
        <Typography variant="h2" bold fontSize="4xl" mt="5">
          User{"\n"}Lookup.
        </Typography>
        <UserForm />
      </VStack>
    </Screen>
  )
}

export default UserScreen