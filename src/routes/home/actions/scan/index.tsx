import React, {FC, useEffect, useState} from "react";
import {Alert, useWindowDimensions, Vibration} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import _ from "lodash";
import {Button, Screen, Toolbar, Typography} from "components/base";
import {useColor} from "assets/styles/theme";
import {Center, VStack} from "native-base";
import {BarCodeScanner, BarCodeScannerResult} from "expo-barcode-scanner";
import Region from 'assets/images/region.svg';
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {CodeRoute, CodeRouteParamList} from "types";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated'

const GetPermission: FC = () => {
  const colors = useColor({
    bgColor: {
      color: "white"
    }
  })

  return (
    <Screen
      backgroundColor={colors.bgColor}
    >
      <VStack>
        <Center>
          <Typography variant="h1">
            Getting Permissions
          </Typography>
        </Center>
      </VStack>
    </Screen>
  )
}

const NoPermission: FC = () => {
  const colors = useColor({
    bgColor: {
      color: "white"
    }
  })

  return (
    <Screen
      backgroundColor={colors.bgColor}
    >
      <VStack justifyContent="center">
        <Center>
          <Typography variant="h1">
            Enable Permissions to start scanning
          </Typography>
        </Center>
      </VStack>
    </Screen>
  )
}

const ScanScreen: FC = () => {
  const { params } = useRoute<RouteProp<CodeRouteParamList, CodeRoute.Scan>>()

  const { width, height } = useWindowDimensions()
  const [scanned, setScanned] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const { top, bottom } = useSafeAreaInsets()

  const { navigate } = useNavigation()

  const regionWidth = 300
  const regionHeight = 300

  const offsetTopText = height / 15
  const offsetTopRegion = height / 6
  const offsetTopScanButton = offsetTopRegion + regionHeight + height / 20
  const offsetTopCode = offsetTopScanButton + height / 13

  const translate = useSharedValue(0)

  // Error Animation
  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translate.value }]
    }
  }, [translate.value])

  useAnimatedReaction(() => {}, () => {
    if (error) {
      translate.value = withSequence(
        withTiming(-10, {duration: 50}),
        withRepeat(withTiming(10, {duration: 50}), 6, true),
        withTiming(0, {duration: 50})
      )
      runOnJS(setError)(false)
    }
  }, [error])

  useEffect(() => {
    if (error) {
      Vibration.vibrate()
    } else {
      Vibration.cancel()
    }
  }, [error])

  const colors = useColor({
    cameraBg: {
      color: "black",
      opacity: 40
    },
    text: {
      color: "white",
      opacity: 100
    }
  })

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const isValid = (data: string) => {
    return data.startsWith("HACKPSU")
  }

  const handleScan = ({ type, data, cornerPoints }: BarCodeScannerResult) => {
    setScanned(false)
    if (cornerPoints) {
      const [tl, tr, br, bl] = cornerPoints
      const leftR = (width - regionWidth) / 2
      const rightR = leftR + regionWidth
      const topR = offsetTopRegion
      const bottomR = offsetTopRegion + regionHeight

      const leftC = _.min([tl.x, bl.x]) ?? 0
      const rightC = _.max([tr.x, br.x]) ?? 0
      const topC = _.max([tl.y, tr.y]) ?? 0
      const bottomC = _.min([bl.y, br.y]) ?? 0

      if (_.inRange(leftC, leftR, rightR) && _.inRange(rightC, leftR, rightR) &&
          _.inRange(topC, topR, bottomR) && _.inRange(bottomC, topR, bottomR)) {
        if (isValid(data)) {
          Alert.alert(`${data}`)
        } else {
          setError(true)
        }
      }
    }
  }

  const onPressCode = () => {
    // @ts-ignore
    navigate(CodeRoute.Code)
  }

  if (hasPermission === null) {
    return <GetPermission />
  }

  if (!hasPermission) {
    return <NoPermission />
  }

  return (
    <Screen
      top={0}
      left={0}
      right={0}
      bottom={0}
      px={0}
      py={0}
      pt={0}
    >
      <BarCodeScanner
        type="back"
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={scanned ? handleScan : undefined}
        style={{
          width,
          height
        }}
      >
        <VStack
          backgroundColor={colors.cameraBg}
          width={width}
          height={height}
          pt={top}
          pb={bottom}
          px="5"
        >
          <Toolbar
            width={35}
            height={35}
            color="#ffffff"
          />
          <Center>
            <Typography
              color={colors.text}
              position="absolute"
              top={offsetTopText}
              opacity="100"
              bold
              variant="h2"
              fontSize="lg"
              textAlign="center"
            >
              Align the QR Code within the frame to scan
            </Typography>
            <Animated.View style={[shakeStyle, {position: "absolute", top: offsetTopRegion}]}>
              <Region width={regionWidth} height={regionHeight} />
            </Animated.View>
            <Button
              position="absolute"
              top={offsetTopScanButton}
              bgColor={colors.text}
              color="black"
              fontSize="lg"
              width="1/2"
              borderRadius="full"
              onPress={() => setScanned(true)}
            >
              Scan
            </Button>
            <Typography
              onPress={onPressCode}
              underline
              color={colors.text}
              bold
              variant="h2"
              position="absolute"
              top={offsetTopCode}
              fontSize="lg"
              textAlign="center"
            >
              Enter Code Manually
            </Typography>
          </Center>
        </VStack>
      </BarCodeScanner>
    </Screen>
  )
}

export default ScanScreen