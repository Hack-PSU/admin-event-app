import {FC} from "react";
import {ScreenProps} from "types";
import {Keyboard, Platform, TouchableWithoutFeedback, useWindowDimensions} from "react-native";
import {Box, KeyboardAvoidingView, ScrollView, Stack, StatusBar, VStack, ZStack} from "native-base";

const WithKeyboardAvoiding: FC = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: "100%" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            { children }
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const WithBgImage: FC<Pick<ScreenProps, "bgImage">> = ({ children, bgImage }) => {
  const { width, height } = useWindowDimensions()

  return (
    <ZStack w={width} h={height}>
      { bgImage }
      <Box w={width} h={height}>
        { children }
      </Box>
    </ZStack>
  )
}

const Content: FC<Pick<ScreenProps, "keyboardAvoiding">> = ({ children, keyboardAvoiding }) => {
  return (
    <>
      { keyboardAvoiding ?
        <WithKeyboardAvoiding>
          { children }
        </WithKeyboardAvoiding>
        :
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            { children }
          </>
        </TouchableWithoutFeedback>
      }
    </>
  )
}

const Screen: FC<ScreenProps> = ({ children, bgImage, statusBarStyle, backgroundColor, keyboardAvoiding, top, right, bottom, left, ...props }) => {
  const { width, height } = useWindowDimensions()

  return (
    <Box
      backgroundColor={backgroundColor ?? "white"}
      safeAreaTop={top ?? !bgImage}
      safeAreaRight={right ?? !bgImage}
      safeAreaBottom={bottom ?? !bgImage}
      safeAreaLeft={left ?? !bgImage}
      px={!bgImage ? (props.px ?? 5) : 0}
      width={width}
      height={height}
      pt={!bgImage ? (props.pt ?? "5") : 0}
      {...props}
    >
      <StatusBar barStyle={statusBarStyle ?? "default"} />
      { bgImage ?
        <WithBgImage bgImage={bgImage}>
          <Content keyboardAvoiding={keyboardAvoiding}>
            { children }
          </Content>
        </WithBgImage>
        :
        <Content keyboardAvoiding={keyboardAvoiding}>
          { children }
        </Content>
      }
    </Box>
  )
}

export default Screen