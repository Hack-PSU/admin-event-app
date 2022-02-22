import React, {FC, useEffect} from "react";
import {IStatusProps} from "types";
import {Lottie} from "components/base";
import Animated, {
  FadeIn,
  FadeOut,
  FadingTransition
} from "react-native-reanimated";
import {Box} from "native-base";

const AnimatedBox = Animated.createAnimatedComponent(Box)

const AnimatedLottie: FC = ({ children }) => {
  return (
    <AnimatedBox mt="10"
                 // layout={FadingTransition}
                 // entering={FadeIn.delay(200).duration(2000)} exiting={FadeIn.duration(5000)}
    >
      { children }
    </AnimatedBox>
  )
}

export const Submission: FC = () => {
  return (
    <AnimatedLottie>
      <Lottie
        source={require("assets/lottie/submitting.json")}
        autoPlay={true}
      />
    </AnimatedLottie>
  )
}

export const Success: FC = () => {
  return (
    <AnimatedLottie>
      <Lottie
        source={require("assets/lottie/success.json")}
        autoPlay={true}
        loop={false}
      />
    </AnimatedLottie>
  )
}

export const Error: FC = () => {
  return (
    <AnimatedLottie>
      <Lottie
        source={require('assets/lottie/error.json')}
        autoPlay={true}
        loop={false}
      />
    </AnimatedLottie>
  )
}

const StatusLottie: FC<IStatusProps> = ({ status }) => {
  return (
    <>
      { status === "submit" && <Submission />}
      { status === "success" && <Success /> }
      { status === "error" && <Error /> }
    </>
  )

}

export default StatusLottie