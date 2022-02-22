import React, {FC, useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Button, ControlledInput, Typography} from "components/base";
import CodeInput from "components/actions/code/CodeInput";
import {useNavigation} from "@react-navigation/native";
import {useEvent} from "components/context";
import {useColor} from "assets/styles/theme";
import {CodeRoute} from "types";

const CodeForm: FC = () => {
  const methods = useForm()

  const { navigate } = useNavigation()
  const { update, userPin } = useEvent()

  const colors = useColor({
    confirmBtn: {
      color: "stadium_orange"
    }
  })

  const onPressConfirm = () => {
    methods.handleSubmit((data, event) => {
      update("user", data.code)
    })()
  }

  useEffect(() => {
    if (userPin !== "") {
      // @ts-ignore
      navigate(CodeRoute.Submit)
    }
  }, [userPin])

  return (
    <FormProvider {...methods}>
      <ControlledInput
        mt="2"
        name="code"
        placeholder="Pin_123"
        as={CodeInput}
      />
      <Button onPress={onPressConfirm} backgroundColor={colors.confirmBtn} mt="10">
        Confirm
      </Button>
    </FormProvider>
  )
}

export default CodeForm