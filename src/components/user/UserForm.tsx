import React, {FC, useEffect, useState} from "react";
import { FormProvider, useForm } from "react-hook-form";
import {Button, ControlledInput, InputBlock, Typography} from "components/base";
import {useQuery} from "react-query";
import {useApi} from "components/context";
import {Box} from "native-base";

const UserForm: FC = () => {
  const methods = useForm()
  const { searchUser } = useApi()
  const [query, setQuery] = useState("")
  const [pin, setPin] = useState<string | null>("")

  const { data } = useQuery(
    ["pin-by-email", query],
    ({ queryKey }) => searchUser(queryKey[1]),
    {
      onSuccess(data) {
        const { pin, status } = data
        if (status === 200) {
          setPin(pin)
        } else if (status === 404) {
          setPin(null)
        }
      },
      enabled: query !== ""
    }
  )

  const onPressQuery = () => {
    methods.handleSubmit((data, event) => {
      setQuery(data.query)
    })()
  }

  return (
    <FormProvider {...methods}>
      <InputBlock label="Query:">
        <ControlledInput
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          type="text"
          mt="1"
          name="query"
          placeholder="Enter query"
        />
      </InputBlock>
      <Button
        mt="5"
        onPress={onPressQuery}
        fontSize="md"
      >
        Search
      </Button>
      <Box mt="5">
        { pin === null &&
          <Typography variant="body1" fontSize="lg">
            User not found
          </Typography>
        }
        { !!pin &&
          <Typography variant="body1" fontSize="lg">
            User Pin: { pin }
          </Typography>
        }
      </Box>
    </FormProvider>
  )
}

export default UserForm
