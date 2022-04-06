import React, {FC, useEffect, useRef} from "react";
import {IEventItem} from "types";
import {Box, FlatList} from "native-base";
import {EventCard} from "components/admin";
import LottieView from "lottie-react-native";
import UpcomingEventsCard from "components/menu/UpcomingEventsCard";

interface IUpcomingEventsListProps {
  events?: IEventItem[]
}

const UpcomingEventsList: FC<IUpcomingEventsListProps> = ({ events }) => {
  const animation = useRef<LottieView>(null)

  useEffect(() => {
    setTimeout(() => animation.current && animation.current.play(), 100)
  }, [animation.current])

  if (!events) {
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
      px="5"
      contentContainerStyle={{ paddingBottom: 150 }}
      data={events}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.uid}
      renderItem={({ item, index }) =>
        <UpcomingEventsCard event={item} key={`${item.uid}-${index}`} />
      }
    />
  )
}

export default UpcomingEventsList