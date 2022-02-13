import React, {FC} from "react";
import {Icon, Screen, Typography} from "components/base";
import {useMultipleColors} from "assets/styles/theme";
import {Box, Flex, Row, VStack} from "native-base";
import {ActionCard} from "components/admin";
import {CodeRoute, HomeRoute, IActionCardProps} from "types";
import {useNavigation} from "@react-navigation/native";

const ScanCard: FC<Pick<IActionCardProps, "onPress">> = ({ onPress }) => {
  return (
    <ActionCard
      onPress={onPress}
      icon={<Icon name="video" height={60} width={60} fill="#1a1a1a" />}
    >
      <Flex flexGrow="1" justifyContent="center">
        <Typography variant="body1">
          Scan QR
        </Typography>
      </Flex>
    </ActionCard>
  )
}

const CodeCard: FC<Pick<IActionCardProps, "onPress">> = ({ onPress }) => {
  return (
    <ActionCard
      onPress={onPress}
      icon={<Icon name="code" height={60} width={60} fill="#1a1a1a" />}
    >
      <Flex flexGrow="1" justifyContent="center">
        <Typography variant="body1">
          Enter Pin
        </Typography>
      </Flex>
    </ActionCard>
  )
}

const AdminScreen: FC = () => {
  const { navigate } = useNavigation()
  const colors = useMultipleColors({
    bg: {
      color: "white",
    }
  })

  const onScanCardPress = () => {
    // @ts-ignore
    navigate(HomeRoute.CodeRoute, {
      screen: CodeRoute.Scan
    })
  }

  const onCodeCardPress = () => {
    // @ts-ignore
    navigate(HomeRoute.CodeRoute, {
      screen: CodeRoute.Code
    })
  }

  return (
    <Screen
      bgColor={colors.bg}
    >
      <VStack px="0.5">
        <Typography variant="h2" bold>
          Hi.
        </Typography>
        <Typography variant="h4" mt="10">
          Actions
        </Typography>
        <Row justifyContent="space-between" mt="5">
          <ScanCard onPress={onScanCardPress} />
          <CodeCard onPress={onCodeCardPress} />
        </Row>
      </VStack>
    </Screen>
  )
}

export default AdminScreen