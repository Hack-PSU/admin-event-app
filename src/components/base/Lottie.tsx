import React, {FC, useEffect, useRef} from "react";
import {ILottieProps} from "types";
import LottieView from 'lottie-react-native'
import {useWindowDimensions} from "react-native";

const Lottie: FC<ILottieProps> = ({ autoPlay, width, height, loop, play, stop, source }) => {
  const animation = useRef<LottieView>(null)
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()

  const viewW = windowWidth / 3.3
  const viewH = windowHeight / 3.3

  useEffect(() => {
    if (animation.current) {
      animation.current.play()
    }
  }, [])

  // useEffect(() => {
  //   if (animation.current && stop) {
  //     animation.current.pause()
  //   }
  // }, [stop])

  return (
    <LottieView
      source={source}
      ref={animation}
      loop={loop ?? true}
      autoPlay={autoPlay ?? false}
      style={{
        width: width ?? viewW,
        height: height ?? viewH,
      }}
    />
  )
}

export default Lottie