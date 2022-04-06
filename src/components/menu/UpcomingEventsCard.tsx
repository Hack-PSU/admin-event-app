import {FC} from "react";
import {CodeRoute, HomeRoute, IEventCardProps, MainRoute} from "types";
import {EventCard} from "components/admin";
import {useNavigation} from "@react-navigation/native";

const UpcomingEventsCard: FC<Pick<IEventCardProps, "event">> = ({ event }) => {
  const { navigate } = useNavigation()

  const onNavigateCode = () => {
    // @ts-ignore
    navigate(MainRoute.Home, {
      screen: HomeRoute.CodeRoute,
      params: {
        screen: CodeRoute.Code,
        params: {
          eventUid: event.uid,
          fromAdmin: true
        }
      }
    })
  }

  const onNavigateScan = () => {
    // @ts-ignore
    navigate(MainRoute.Home, {
      screen: HomeRoute.CodeRoute,
      params: {
        screen: CodeRoute.Scan,
        params: {
          eventUid: event.uid,
          fromAdmin: true
        }
      }
    })
  }

  return (
    <EventCard event={event} onNavigateCode={onNavigateCode} onNavigateScan={onNavigateScan} />
  )
}

export default UpcomingEventsCard