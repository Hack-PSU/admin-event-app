import React, {FC, useEffect, useState} from "react";
import {Screen} from "components/base";
import {useColor} from "assets/styles/theme";
import {Box, Center, VStack} from "native-base";
import {SubmissionStatus} from "types";
import {StatusActions, StatusLottie} from "components/actions";
import StatusText from "components/actions/submit/StatusText";
import {useApi} from "components/context/ApiProvider";
import {useEvent} from "components/context";

const SubmitScreen: FC = () => {
  const [status, setStatus] = useState<SubmissionStatus>("submit")
  const { eventUid, userPin } = useEvent()
  const { checkInWorkshop } = useApi()

  const colors = useColor({
    bg: {
      color: "white"
    }
  })

  useEffect(() => {
    (async () => {
      try {
        const valid = await checkInWorkshop(eventUid, userPin)

        if (valid) {
          setStatus("success")
        } else {
          setStatus("error")
        }

      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <Screen
      backgroundColor={colors.bg}
    >
      <VStack px="0.5">
        <Center>
          <StatusLottie status={status} />
          <StatusText status={status} />
          <Box mt="10" width="full">
            <StatusActions status={status} />
          </Box>
        </Center>
      </VStack>
    </Screen>
  )
}

export default SubmitScreen