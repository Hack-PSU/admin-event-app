import React, {FC, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Button, ControlledInput, ControlledRadio, ControlledSelect, Icon, Radio, Typography} from "components/base";
import {Box, Row, VStack, Icon as NativeIcon, Modal} from "native-base";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useApi, useNotification} from "components/context";
import {HubRoute, IEventItem, INotificationPayload} from "types";
import {useQuery} from "react-query";

const InputBlock: FC<{ label: string }> = ({ label, children }) => {
  return (
    <Box mt="3">
      <Typography variant="body1" fontSize="md">
        { label }
      </Typography>
      { children }
    </Box>
  )
}

const NotificationType: FC = () => {
  const [showModal, setShowModal] = useState(false)
  const { request } = useNotification()

  const onPressHelp = () => {
    setShowModal(true)
  }

  const onCloseHelp = () => {
    setShowModal(false)
  }

  return (
    <Box mt="3">
      <Modal isOpen={showModal} onClose={onCloseHelp}>
        <Modal.Content maxWidth="500px">
          <Modal.CloseButton />
          <Modal.Header>
            <Typography variant="body1" fontSize="2xl" bold>
              Notification Types
            </Typography>
          </Modal.Header>
          <Modal.Body>
            <VStack>
              <Typography variant="body2">
                Events: notifications are sent to participants that liked the event
              </Typography>
              <Typography variant="body2" mt="5">
                Broadcast: notifications are sent to all participants
              </Typography>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Row alignItems="center" space="xs">
        <Typography variant="body1" fontSize="md">
          Select a notification type:
        </Typography>
        <NativeIcon
          onPress={onPressHelp}
          as={
            <FontAwesome5 name="question-circle" />
          }
          size="5"
        />
      </Row>
      <ControlledRadio
        items={[{ value: "topic", display: "Events" }, { value: "broadcast", display: "Broadcast" }]}
        name="notificationType"
        _itemStyle={{
          my: "1"
        }}
        defaultValue={request.type ?? undefined}
      />
    </Box>
  )
}

const SelectTopic: FC<{ events?: IEventItem[] }> = ({ events }) => {
  const { getEvents } = useApi()
  const { request } = useNotification()

  if (!events) {
    return null
  }

  return (
    <Box mt="3">
      <Typography variant="body1" fontSize="md">
        Select a notification type:
      </Typography>
      <ControlledSelect
        placeholder="Select an event"
        items={events.map((event) => ({ label: event.title, value: event.uid }))}
        name="topic"
        defaultValue={request.to ?? undefined}
      />
    </Box>
  )
}

const DraftForm: FC = () => {
  const methods = useForm()
  const { navigate } = useNavigation()
  const { getEvents } = useApi()
  const { request, createNotification } = useNotification()

  const notificationType = methods.watch("notificationType")

  const { data: events, status } = useQuery("events", () => getEvents())

  const onSubmitNotification = () => {
    methods.handleSubmit((data, event) => {
      const payload: INotificationPayload = {
        title: data.title,
        message: data.message,
        isScheduled: false,
      }
      if (data.notificationType === "broadcast") {
        createNotification("all", payload)
      } else {
        if (events) {
          const event = events.filter((event) => event.uid === data.topic)[0]
          createNotification(data.topic, payload, event.title)
        }
      }
    })()
      .then(done => {
        // @ts-ignore
        navigate(HubRoute.Review)
      })
  }

  return (
    <FormProvider {...methods}>
      <InputBlock label="Title:">
        <ControlledInput
          mt="1"
          name="title"
          placeholder="Enter the title"
          defaultValue={request.title ?? ""}
        />
      </InputBlock>
      <InputBlock label="Message:">
        <ControlledInput
          mt="1"
          name="message"
          placeholder="Enter the notification body"
          multiline
          defaultValue={request.message ?? ""}
        />
      </InputBlock>
      <NotificationType />
      {
        notificationType === "topic" && <SelectTopic events={events} />
      }
      <Button
        mt="5"
        fontSize="lg"
        onPress={onSubmitNotification}
      >
        Review Notification
      </Button>
    </FormProvider>
  )
}

export default DraftForm