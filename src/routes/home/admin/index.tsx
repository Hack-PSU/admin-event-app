import React, {FC} from "react";
import {Button, Icon, Screen, Typography} from "components/base";
import {useColor} from "assets/styles/theme";
import {Box, Flex, Row, VStack, FlatList} from "native-base";
import {ActionCard, EventCard} from "components/admin";
import {CodeRoute, HomeRoute, IActionCardProps} from "types";
import {useNavigation} from "@react-navigation/native";
import {useFirebase} from "components/context/FirebaseProvider";
import moment from "moment";
import {useSafeAreaInsets} from "react-native-safe-area-context";

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
      icon={<Icon name="code" width={60} height={60} fill="black" />}
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
  const { logout } = useFirebase()
  const { navigate } = useNavigation()
  const { top } = useSafeAreaInsets()
  const colors = useColor({
    bg: {
      color: "white",
    },
    button: {
      color: "stadium_orange"
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

  const onPressLogout = async () => {
    await logout()
  }

  const events = [
    { uid: "eventId", title: "Machine Learning with Python", startTime: moment().unix(), endTime: moment().add(1, "day").unix() },
    { uid: "eventId", title: "Machine Learning with Python", startTime: moment().unix(), endTime: moment().add(1, "day").unix() }
  ]

  return (
    <Screen
      bgColor={colors.bg}
      px={0}
    >
      <VStack px="0.5">
        <VStack px="5">
          <Typography variant="h2" bold>
            Workshops.
          </Typography>
          <Typography variant="h4" mt="10">
            Events
          </Typography>
        </VStack>
        <FlatList
          px="5"
          contentContainerStyle={{ paddingBottom: 50 }}
          data={events}
          renderItem={({ item, index }) =>
            <EventCard event={item} key={index} />
          }
        />
        <VStack px="5">
          <Button
            mt="5"
            backgroundColor={colors.button}
            fontSize="lg"
            onPress={onPressLogout}
          >
            Logout
          </Button>
        </VStack>
      </VStack>
    </Screen>
  )
}

export default AdminScreen