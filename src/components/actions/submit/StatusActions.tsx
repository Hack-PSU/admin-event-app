import {FC} from "react";
import {HomeRoute, IStatusButtonProps, IStatusProps} from "types";
import {Button, Typography} from "components/base";
import {useColor} from "assets/styles/theme";
import {useNavigation} from "@react-navigation/native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import {Box} from "native-base";
import {useEvent} from "components/context";

const SuccessButtons: FC<IStatusButtonProps> = ({ onPressBack, onPressHome }) => {
  const colors = useColor({
    homeBtn: {
      color: "hacky_blue",
    },
    backBtn: {
      color: "stadium_orange"
    },
    btnText: {
      color: "white"
    }
  })

  return (
    <>
      <Button backgroundColor={colors.homeBtn} onPress={onPressHome}>
        Go Home
      </Button>
      <Button backgroundColor={colors.backBtn} onPress={onPressBack} mt="5">
        Go Back
      </Button>
    </>
  )
}

const ErrorButtons: FC<Pick<IStatusButtonProps, "onPressBack">> = ({ onPressBack }) => {
  const colors = useColor({
    againBtn: {
      color: "stadium_orange"
    },
    btnText: {
      color: "white"
    }
  })

  return (
    <Button backgroundColor={colors.againBtn} onPress={onPressBack}>
      Try Again
    </Button>
  )
}

const AnimatedBox = Animated.createAnimatedComponent(Box)

const StatusActions: FC<IStatusProps> = ({ status }) => {
  const { navigate, goBack } = useNavigation()
  const { update } = useEvent()

  const onPressHome = () => {
    update("user", "")
    // @ts-ignore
    navigate(HomeRoute.Admin)
  }

  const onPressBack = () => {
    update("user", "")
    goBack()
  }

  switch (status) {
    case "submit":
      return null
    case "success":
      return (
        <AnimatedBox entering={FadeIn} exiting={FadeOut}>
          <SuccessButtons onPressHome={onPressHome} onPressBack={onPressBack} />
        </AnimatedBox>
      )
    case "error":
      return (
        <AnimatedBox entering={FadeIn} exiting={FadeOut}>
          <ErrorButtons onPressBack={onPressBack} />
        </AnimatedBox>
      )
  }
}

export default StatusActions