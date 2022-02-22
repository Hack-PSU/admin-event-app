import {FC} from "react";
import {IStatusProps, SubmissionStatus} from "types";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import {Box} from "native-base";
import {Typography} from "components/base";

const displayStatus = (status: SubmissionStatus) => {

}

const AnimatedBox = Animated.createAnimatedComponent(Box)

const StatusText: FC<IStatusProps> = ({ status }) => {
  switch (status) {
    case "submit":
      return (
        <AnimatedBox entering={FadeIn} exiting={FadeOut} mt="5">
          <Typography variant="h1">
            Verifying Pin...
          </Typography>
        </AnimatedBox>
      )
    case "success":
      return (
        <AnimatedBox entering={FadeIn} exiting={FadeOut} mt="5">
          <Typography variant="h1">
            Pin Recorded
          </Typography>
        </AnimatedBox>
      )
    case "error":
      return (
        <AnimatedBox entering={FadeIn} exiting={FadeOut} mt="5">
          <Typography variant="h1">
            An Error Occurred
          </Typography>
        </AnimatedBox>
    )
  }
}

export default StatusText