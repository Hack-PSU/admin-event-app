import React, {FC, useEffect, useRef, useState} from "react";
import {Screen, Typography, Button} from "components/base";
import {useColor} from "assets/styles/theme";
import {Box, Modal, Row, VStack} from "native-base";
import {useApi, useNotification} from "components/context";
import {useQuery} from "react-query";
import LottieView from "lottie-react-native";
import {useNavigation} from "@react-navigation/native";
import {MainRoute} from "types";

const ReviewItem: FC<{ label: string, item: string }> = ({ label, item }) => {
  return (
    <Box mt="3">
      <Typography variant="h2" fontSize="lg" bold>
        { label }
      </Typography>
      <Typography variant="body1" fontSize="md">
        { item }
      </Typography>
    </Box>
  )
}

const ReviewScreen: FC = () => {
  const { request, sendNotification, topicDisplay } = useNotification()
  const [submit, setSubmit] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const { navigate } = useNavigation()
  const [showSuccess, setShowSuccess] = useState(false)

  const animation = useRef<LottieView>(null)

  useEffect(() => {
    setTimeout(() => animation.current && animation.current.play(), 100)
  }, [animation.current])

  const colors = useColor({
    bg: {
      color: "white"
    },
    confirmBtn: {
      color: "success"
    }
  })

  const { data, status, error } = useQuery(
    "send-notification",
    () => sendNotification(),
    {
      enabled: confirm,
      onSuccess() {
        setShowSuccess(true)
      }
    }
  )

  const onPressSubmit = () => {
    setSubmit(true)
  }

  const onCloseModal = () => {
    setSubmit(false)
  }

  const onPressConfirm = () => {
    setConfirm(true)
    setSubmit(false)
  }

  const onPressHome = () => {
    setShowSuccess(false)
    // @ts-ignore
    navigate(MainRoute.Menu)
  }

  return (
    <Screen
      bgColor={colors.bg}
    >
      <VStack px="0.5">
        <Modal isOpen={submit} onClose={onCloseModal}>
          <Modal.Content maxWidth="500px">
            <Modal.CloseButton />
            <Modal.Header>
              <Typography fontSize="lg" variant="h2" bold>
                Send Notification
              </Typography>
            </Modal.Header>
            <Modal.Body>
              <Typography fontSize="md" variant="body1">
                Notifications are permanent once sent. Are you sure you want to send this notification?
              </Typography>
            </Modal.Body>
            <Modal.Footer>
              <Button onPress={onPressConfirm} backgroundColor={colors.confirmBtn}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Modal isOpen={status === "success"}>
          <Modal.Content maxWidth="500px">
            <Modal.Header>
              <Typography variant="h2" bold fontSize="lg">
                Notification Sent
              </Typography>
            </Modal.Header>
            <Modal.Body>
              <Typography variant="body1" fontSize="md">
                Your notification was successfully scheduled.
              </Typography>
            </Modal.Body>
            <Modal.Footer>
              <Row>
                <Button
                  onPress={onPressHome}
                >
                  Go To Home
                </Button>
              </Row>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Typography variant="h2" bold fontSize="4xl">
          Review{"\n"}Notification.
        </Typography>
        <ReviewItem label="Title:" item={request.title} />
        <ReviewItem label="Message:" item={request.message} />
        <ReviewItem label="Notification Type:" item={request.type === "topic" ? "Events" : "Broadcast"} />
        <ReviewItem label="Broadcast To:" item={request.to === "all" ? "All Participants" : topicDisplay} />
        <Button
          mt="5"
          onPress={onPressSubmit}
          fontSize="md"
        >
          Send Notification
        </Button>
      </VStack>
    </Screen>
  )
}

export default ReviewScreen