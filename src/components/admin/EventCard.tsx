import React, {FC} from "react";
import {Box, Pressable, Row, VStack} from "native-base";
import {useColor, useShadow} from "assets/styles/theme";
import {CodeRoute, HomeRoute, IEventCardProps} from "types";
import {Icon, Typography} from "components/base";
import _ from "lodash";
import moment from "moment";
import {useNavigation} from "@react-navigation/native";

const EventCard: FC<IEventCardProps> = ({ event, children }) => {
  const { navigate } = useNavigation()
  const { uid, title, startTime, endTime } = event

  const colors = useColor({
    card: {
      color: "white"
    },
    icon: {
      color: "black"
    },
    iconBg: {
      color: "blue",
      shade: "500"
    }
  })

  const onPressScan = () => {
    // @ts-ignore
    navigate(HomeRoute.CodeRoute, {
      screen: CodeRoute.Scan,
      params: {
        eventUid: uid
      }
    })
  }

  const onPressCode = () => {
    // @ts-ignore
    navigate(HomeRoute.CodeRoute, {
      screen: CodeRoute.Code,
      params: {
        eventUid: uid
      }
    })
  }

  const shadowStyle = useShadow()

  return (
    <Box
      width="full"
      height={150}
      rounded="lg"
      style={shadowStyle}
      backgroundColor={colors.card}
      py="3"
      px="2"
      mt="4"
    >
      <VStack space="2xs" flexGrow="2">
        <Typography variant="h2" bold fontSize="lg" numberOfLines={2}>
          { _.startCase(_.lowerCase(title)) }
        </Typography>
        <Typography variant="sub1">
          { `${moment(startTime).local().format("h:mmA")} - ${moment(endTime).local().format("h:mmA")}` }
        </Typography>
      </VStack>
      <Row mt="2" space="md">
        <Pressable
          rounded="lg"
          onPress={onPressScan}
          p="1"
        >
          <Icon name="video" width={40} height={40} fill="#1a1a1a" />
        </Pressable>
        <Pressable
          rounded="lg"
          onPress={onPressCode}
          p="1"
        >
          <Icon name="code" width={40} height={40} fill="#1a1a1a" />
        </Pressable>
      </Row>
    </Box>
  )
}

export default EventCard