import React, {FC, useCallback, useEffect, useState} from "react";
import {Button, Icon, Screen, Typography} from "components/base";
import {useColor} from "assets/styles/theme";
import {Box, Flex, HStack, VStack, Icon as NativeIcon, Pressable, Row, Modal, Menu} from "native-base";
import {MenuCard, UpcomingEventsList} from "components/menu";
import {Entypo, Feather, MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from "@react-navigation/native";
import {HomeRoute, IEventItem, MainRoute} from "types";
import {useApi, useFirebase} from "components/context";
import {useQuery} from "react-query";
import * as _ from 'lodash'
import moment from "moment";
import {AuthPrivilege} from "types/auth";

const MenuScreen: FC = () => {
  const { navigate } = useNavigation()
  const { logout, validatePermissions } = useFirebase()
  const { getEvents } = useApi()
  const [upcoming, setUpcoming] = useState<IEventItem[]>()
  const [unauthorized, setUnauthorized] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const { data: events, status } = useQuery(
    "events",
    () => getEvents()
  )

  const getNextEvent = useCallback(() => {
    if (status === "success" && events) {
      const upcomingEvent = _.chain(events)
        .groupBy(event => event.startTime)
        .entries()
        .filter(([ key, _ ]) => moment(key, "x").add(15, "minute").isAfter(moment.now()))
        .first()
        .value()[1]

      setUpcoming(upcomingEvent as IEventItem[])
    }
  }, [events, status])

  useEffect(() => {
    if (status === "success" && events) {
      getNextEvent()
      const timer = setInterval(() => {
        getNextEvent()
      }, 10 * 60 * 1000)

      return () => clearInterval(timer)
    }
  }, [events, status])

  const colors = useColor({
    bg: {
      color: "white"
    }
  })

  const onPressRegistration = () => {
    // @ts-ignore
    navigate(MainRoute.Home)
  }

  const onPressNotifications = () => {
    if (validatePermissions(AuthPrivilege.DIRECTOR)) {
      // @ts-ignore
      navigate(MainRoute.Hub)
    } else {
      setUnauthorized(true)
      setOpenModal(true)
    }
  }

  const onPressSearch = () => {
    // @ts-ignore
    navigate(MainRoute.User)
  }

  const onPressLogout = () => {
    void logout()
  }

  const onCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <Screen
      bgColor={colors.bg}
      px={0}
    >
      <VStack px="0.5">
        <Modal isOpen={openModal} onClose={onCloseModal}>
          <Modal.Content maxWidth="500px">
            <Modal.CloseButton />
            <Modal.Header>
              <Typography variant="h2" fontSize="xl" bold>
                Feature not available
              </Typography>
            </Modal.Header>
            <Modal.Body>
              <Typography variant="body1">
                Please contact your director to use this feature.
              </Typography>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <VStack px="5">
          <Row width="full" justifyContent="space-between">
            <Typography variant="h2" bold fontSize="4xl">
              Actions.
            </Typography>
            <Button
              onPress={onPressLogout}
              rounded='2xl'
              width="40%"
              leftIcon={<Icon name="log-out-outline" fill="#ffffff" width={25} height={25} />}
              leftIconMl="0"
              >
                Logout
              </Button>
          </Row>
          <HStack mt="8" justifyContent="space-between">
            <Pressable width="45%" onPress={onPressRegistration}>
              <MenuCard
                icon={
                  <MaterialCommunityIcons name="qrcode-scan" />
                }
                label="Registration"
              />
            </Pressable>
            <Pressable width="45%" onPress={onPressNotifications}>
              <MenuCard
                icon={
                  <Entypo name="notification" />
                }
                label="Notifications"
              />
            </Pressable>
          </HStack>
          <HStack mt="5" justifyContent="space-between">
            <Pressable width="45%" onPress={onPressSearch}>
              <MenuCard
                icon={
                  <Feather name="user" />
                }
                label="Users"
              />
            </Pressable>
          </HStack>
          <Typography variant="h2" fontSize="2xl" bold mt="5">
            Upcoming Events
          </Typography>
        </VStack>
        <UpcomingEventsList events={upcoming} />
      </VStack>
    </Screen>
  )
}

export default MenuScreen