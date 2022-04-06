import {FC} from "react";
import {HomeRoute, IStatusButtonProps, IStatusProps, MainRoute} from "types";
import {Button, Typography} from "components/base";
import {useColor} from "assets/styles/theme";
import {useNavigation} from "@react-navigation/native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import {Box} from "native-base";
import {useEvent} from "components/context";

const SuccessButtons: FC<IStatusButtonProps> = ({ onPressEvents, onPressBack, onPressHome }) => {
  const colors = useColor({
    eventsBtn: {
      color: "hacky_blue",
    },
    homeBtn: {
      color: "university_blue",
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
      <Button backgroundColor={colors.eventsBtn} onPress={onPressEvents}>
        Go To Events
      </Button>
      <Button backgroundColor={colors.homeBtn} onPress={onPressHome} mt="5">
        Go To Home
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
  const { update, fromAdmin } = useEvent()

  const onPressHome = () => {
    update("user", "")
    // @ts-ignore
    navigate(MainRoute.Menu)
  }

  const onPressBack = () => {
    update("user", "")
    goBack()
  }

  const onPressEvents = () => {
    update("user", "")
    // @ts-ignore
    navigate(HomeRoute.Admin, {
      params: {
        fromAdmin: fromAdmin
      }
    })
  }

  switch (status) {
    case "submit":
      return null
    case "success":
      return (
        <AnimatedBox entering={FadeIn} exiting={FadeOut}>
          <SuccessButtons onPressEvents={onPressEvents} onPressHome={onPressHome} onPressBack={onPressBack} />
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