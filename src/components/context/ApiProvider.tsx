import React, {createContext, FC, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import axios, {AxiosInstance} from "axios";
import {useFirebase} from "components/context/FirebaseProvider";
import {IApiProviderHooks, IApiProviderProps, IEventItem} from "types";

const ApiContext = createContext<IApiProviderHooks>({} as IApiProviderHooks)

const ApiProvider: FC<IApiProviderProps> = ({ baseURL, children }) => {
  const { token } = useFirebase()
  // keeps api initialized throughout component life
  // (does not change when re-rendering)
  const api = useRef<AxiosInstance>()

  useEffect(() => {
    if (token !== "") {
      api.current = axios.create({
        baseURL,
        headers: {
          idtoken: token,
        },
      })
    }
  }, [token])

  console.log(token)

  const checkInWorkshop = useCallback(async (event_id: string, user_pin: string) => {
    if (api.current) {
      try {
        const res = await api.current.post("/workshop/check-in", {
          eventUid: event_id,
          pin: Number(user_pin)
        })
        const { result } = res.data.body
        return result === "Success"
      } catch (e) {
        console.error(e)
      }
    }
    return false
  }, [api.current])

  const getEvents = useCallback(async () => {
    if (api.current) {
      try {
        const res = await api.current.get("/live/events")
        const { data } = res.data.body

        return (data as any[]).map<IEventItem>(
          ({ uid, event_title, event_start_time, event_end_time }) =>
            ({ uid, title: event_title, startTime: event_start_time, endTime: event_end_time })
        )
      } catch (e) {
        console.error(e)
      }
    }
    return []
  }, [api.current])

  const value = useMemo(() => ({
    api: api.current,
    checkInWorkshop,
    getEvents,
  }), [
    api.current,
    checkInWorkshop,
    getEvents
  ])

  return (
    <ApiContext.Provider value={value}>
      { children }
    </ApiContext.Provider>
  )
}

export const useApi = () => useContext(ApiContext)
export default ApiProvider