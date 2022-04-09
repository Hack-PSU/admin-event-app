import React, {FC} from "react";
import {Button, ControlledInput, Screen, Toolbar, Typography} from "components/base";
import {useColor} from "assets/styles/theme";
import {Box, VStack} from "native-base";
import {FormProvider, useForm} from "react-hook-form";
import {HubRoute, INotificationPayload} from "types";
import {useNotification} from "components/context";
import {useNavigation} from "@react-navigation/native";

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

const DraftUserScreen: FC = () => {
  const methods = useForm()
  const { createNotification } = useNotification()
  const { navigate } = useNavigation()
  const colors = useColor({
    bg: {
      color: "white"
    }
  })

  const onSubmitNotification = () => {
    methods.handleSubmit((data, event) => {
      const payload: INotificationPayload = {
        title: data.title,
        message: data.message,
        isScheduled: false,
        userPin: data.pin
      }
      createNotification("user", payload, data.pin)
    })()
      .then(done => {
        // @ts-ignore
        navigate(HubRoute.Review)
      })
  }

  return (
    <Screen
      bgColor={colors.bg}
      keyboardAvoiding
    >
      <VStack px="0.5">
        <Toolbar back/>
        <Typography variant="h2" fontSize="4xl" bold>
          Create{"\n"}Notification.
        </Typography>
        <FormProvider {...methods}>
          <InputBlock label="User Pin:">
            <ControlledInput
              mt="1"
              name="pin"
              placeholder="Enter user pin"
            />
          </InputBlock>
          <InputBlock label="Title:">
            <ControlledInput
              mt="1"
              name="title"
              placeholder="Enter the title"
            />
          </InputBlock>
          <InputBlock label="Message:">
            <ControlledInput
              mt="1"
              name="message"
              placeholder="Enter the notification message"
            />
          </InputBlock>
          <Button
            mt="5"
            fontSize="lg"
            onPress={onSubmitNotification}
          >
            Review Notification
          </Button>
        </FormProvider>
      </VStack>
    </Screen>
  )
}

export default DraftUserScreen