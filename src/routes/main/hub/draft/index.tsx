import React, {FC} from "react";
import {Screen, Typography} from "components/base";
import {useColor} from "assets/styles/theme";
import {VStack} from "native-base";
import {DraftForm} from "components/hub";

const DraftScreen: FC = () => {
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
        <Typography variant="h2" fontSize="4xl" bold>
          Create{"\n"}Notification.
        </Typography>
        <DraftForm />
      </VStack>
    </Screen>
  )
}

export default DraftScreen