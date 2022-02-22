import React, {FC, useEffect, useRef, useState} from "react";
import {IEventItem} from "types";
import {Box, FlatList} from "native-base";
import {EventCard} from "components/admin/index";
import LottieView from "lottie-react-native";
import {useApi} from "components/context";

const EventList: FC = () => {
  const animation = useRef<LottieView>(null)
  const [events, setEvents] = useState<IEventItem[]>([])
  const { getEvents } = useApi()

  useEffect(() => {
    setTimeout(() => animation.current && animation.current.play(), 100)
  }, [animation.current])

  useEffect(() => {
    (async () => {
      setEvents(await getEvents())
    })()
  }, [])

  if (events.length === 0) {
    return (
      <Box width="full">
        <LottieView
          source={require("assets/lottie/loading-2.json")}
          autoPlay={true}
          loop={true}
          ref={animation}
          style={{
            width: "100%",
          }}
        />
      </Box>
    )
  }

  return (
    <FlatList
      mt="1"
      px="5"
      contentContainerStyle={{ paddingBottom: 150 }}
      data={events}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) =>
        <EventCard event={item} key={index} />
      }
    />
  )
}

export default EventList
