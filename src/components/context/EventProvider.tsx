import React, {createContext, FC, useContext, useMemo, useState} from "react";
import {IEventProviderHooks, IEventProviderProps} from "types";

const EventContext = createContext<IEventProviderHooks>({} as IEventProviderHooks)

const EventProvider: FC<IEventProviderProps> = ({ eventUid: eventId, children }) => {
  const [eventUid, setEventUid] = useState<string>(eventId)
  const [userPin, setUserPin] = useState<string>("")

  const update = (action: "event" | "user", payload: string) => {
    if (action === "event") {
      setEventUid(payload)
    } else if (action === "user") {
      // assumes payload can be converted to a number
      setUserPin(payload)
    }
  }

  const value = useMemo(() => ({
    eventUid,
    userPin,
    update
  }), [
    eventUid,
    userPin,
    update
  ])

  return (
    <EventContext.Provider value={value}>
      { children }
    </EventContext.Provider>
  )
}

export const useEvent = () => useContext(EventContext)
export default EventProvider