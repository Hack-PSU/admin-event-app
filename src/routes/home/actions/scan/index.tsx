import React, {FC, useEffect, useState} from "react";
import {Alert, useWindowDimensions} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import _ from "lodash";
import {BarCodeScanningResult, Camera} from "expo-camera";
import {Button, Screen, Toolbar, Typography} from "components/base";
import {useColor, useMultipleColors} from "assets/styles/theme";
import {Box, Center, VStack} from "native-base";
import {BarCodeScanner} from "expo-barcode-scanner";
import Region from 'assets/images/region.svg';
import {useNavigation} from "@react-navigation/native";
import {CodeRoute} from "types";

const GetPermission: FC = () => {
  const bgColor = useColor({
    color: "white"
  })

  return (
    <Screen
      backgroundColor={bgColor}
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
  const bgColor = useColor({
    color: "white"
  })

  return (
    <Screen
      backgroundColor={bgColor}
    >
      <VStack>
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
  const { width, height } = useWindowDimensions()
  const [scanned, setScanned] = useState<boolean>(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const { top, bottom } = useSafeAreaInsets()

  const { navigate } = useNavigation()

  const regionWidth = 300
  const regionHeight = 300

  const offsetTopText = height / 15
  const offsetTopRegion = height / 6
  const offsetTopScanButton = offsetTopRegion + regionHeight + height / 20
  const offsetTopCode = offsetTopScanButton + height / 13

  const colors = useMultipleColors({
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
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const handleScan = ({ type, data, cornerPoints }: BarCodeScanningResult) => {
    setScanned(false)
    if (cornerPoints) {
      const [tl, tr, br, bl] = cornerPoints
      const leftR = (width - regionWidth) / 2
      const rightR = leftR + regionWidth
      const topR = offsetTopRegion
      const bottomR = offsetTopRegion + regionHeight

      const leftC = (_.min([tl.x, bl.x]) ?? 0)
      const rightC = (_.max([tr.x, br.x]) ?? 0)
      const topC = (_.max([tl.y, tr.y]) ?? 0)
      const bottomC = (_.min([bl.y, br.y]) ?? 0)

      if (_.inRange(leftC, leftR, rightR) && _.inRange(rightC, leftR, rightR) &&
          _.inRange(topC, topR, bottomR) && _.inRange(bottomC, topR, bottomR)) {
        Alert.alert(`${data}`)
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
            <Box position="absolute" top={offsetTopRegion}>
              <Region width={regionWidth} height={regionHeight} />
            </Box>
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