import {FC} from "react";
import {ScreenProps} from "types";
import {Keyboard, Platform, TouchableWithoutFeedback, useWindowDimensions} from "react-native";
import {Box, KeyboardAvoidingView, ScrollView, Stack, StatusBar, VStack, ZStack} from "native-base";
import Toolbar from "components/base/Toolbar";

const WithKeyboardAvoiding: FC<Pick<ScreenProps, "withToolbar" | "scrollEnabled">> = ({ children, scrollEnabled, withToolbar }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: "100%" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={scrollEnabled}>
        <TouchableWithoutFeedback onPress={() => console.log("HERE")}>
          <>
            { withToolbar && <Toolbar back /> }
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

const Content: FC<Pick<ScreenProps, "keyboardAvoiding" | "withToolbar" | "scrollEnabled">> = ({ scrollEnabled, withToolbar, children, keyboardAvoiding }) => {
  return (
    <>
      { keyboardAvoiding ?
        <WithKeyboardAvoiding withToolbar={withToolbar} scrollEnabled={scrollEnabled}>
          { children }
        </WithKeyboardAvoiding>
        :
        <TouchableWithoutFeedback onPress={() => console.log("HERE")}>
          <>
            { withToolbar && <Toolbar back /> }
            { children }
          </>
        </TouchableWithoutFeedback>
      }
    </>
  )
}

const Screen: FC<ScreenProps> = ({ children, scrollEnabled, withToolbar, bgImage, statusBarStyle, backgroundColor, keyboardAvoiding, top, right, bottom, left, ...props }) => {
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
      {/*{ withToolbar && !keyboardAvoiding && <Toolbar back /> }*/}
      { bgImage ?
        <WithBgImage bgImage={bgImage}>
          <Content scrollEnabled={scrollEnabled} keyboardAvoiding={keyboardAvoiding} withToolbar={withToolbar}>
            { children }
          </Content>
        </WithBgImage>
        :
        <Content scrollEnabled={scrollEnabled} keyboardAvoiding={keyboardAvoiding} withToolbar={withToolbar}>
          { children }
        </Content>
      }
    </Box>
  )
}

export default Screen