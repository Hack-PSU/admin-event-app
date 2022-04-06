import React, {FC, useEffect, useRef, useState} from "react";
import {IEventItem} from "types";
import {Box, FlatList} from "native-base";
import {EventCard} from "components/admin/index";
import LottieView from "lottie-react-native";
import {useApi} from "components/context";
import {useQuery} from "react-query";

const EventList: FC = () => {
  const animation = useRef<LottieView>(null)
  // const [events, setEvents] = useState<IEventItem[]>([])
  const { getEvents } = useApi()

  const { data: events, status } = useQuery("events", () => getEvents())

  useEffect(() => {
    setTimeout(() => animation.current && animation.current.play(), 100)
  }, [animation.current])

  if (status === "loading" || !events) {
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
      keyExtractor={(item) => item.uid}
      renderItem={({ item, index }) =>
        <EventCard event={item} key={`${item.uid}-${index}`} />
      }
    />
  )
}

export default EventList
