import {createContext, FC, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {
  INotificationProviderHooks,
  INotificationProviderProps,
  INotificationResponse,
  NotificationRequest
} from "types";
import axios, {AxiosInstance} from "axios";
import {useFirebase} from "components/context/FirebaseProvider";

const NotificationContext = createContext<INotificationProviderHooks>({} as INotificationProviderHooks)

const NotificationProvider: FC<INotificationProviderProps> = ({ baseURL, children }) => {
  const { token } = useFirebase()
  const [request, setRequest] = useState<NotificationRequest>({} as NotificationRequest)
  const [showConsent, setShowConsent] = useState<boolean>(true)
  const api = useRef<AxiosInstance>()

  const [topicDisplay, setTopicDisplay] = useState("")

  useEffect(() => {
    if (token !== "") {
      api.current = axios.create({
        baseURL: baseURL,
        headers: {
          idtoken: token
        }
      })
    }
  }, [token])

  const createNotification: INotificationProviderHooks["createNotification"] =
    useCallback((to, { userPin, ...payload }, topicDisplay?: string) => {
      const request: NotificationRequest = { ...payload } as NotificationRequest

      if (topicDisplay) {
        setTopicDisplay(topicDisplay)
      }

      if (to === "all") {
        // is broadcast
        request.type = "broadcast"
        request.to = "all"
      } else if (to === "user" && userPin) {
        request.type = "user"
        request.to = userPin
      } else {
        request.type = "topic"
        request.to = to
      }
      setRequest(request)
      // return request
    }, [])

  const sendNotification = useCallback(async () => {
    if (api.current) {
      try {
        if (request.type === "topic") {
          const res = await api.current.post("/message/send", {
            title: request.title,
            message: request.message,
            topic: request.to
          })
          return res.data
        } else if (request.type === "user") {
          const res = await api.current.post("/message/send", {
            title: request.title,
            message: request.message,
            userPin: request.to
          })
          return res.data
        } else if (request.type === "broadcast") {
          const res = await api.current.post("/message/send", {
            title: request.title,
            message: request.message,
            broadcast: true
          })
          return res.data
        }
      } catch (e) {
        console.error(e)
        throw Error(e)
      }
    }
    return {} as INotificationResponse
  }, [request])

  const reset = useCallback(() => {
    setRequest({} as NotificationRequest)
  }, [])

  const value = useMemo(() => ({
    showConsent,
    createNotification,
    sendNotification,
    request,
    topicDisplay,
    reset,
  }), [
    showConsent,
    createNotification,
    sendNotification,
    request,
    topicDisplay,
    reset
  ])

  return (
    <NotificationContext.Provider value={value}>
      { children }
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
export default NotificationProvider