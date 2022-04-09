import React, {FC, useEffect, useRef, useState} from "react";
import {Button, Icon, Screen, Select, Toolbar, Typography} from "components/base";
import {useColor} from "assets/styles/theme";
import {Box, Row, VStack} from "native-base";
import {EventList} from "components/admin";
import {useFirebase} from "components/context/FirebaseProvider";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {Filter, HomeRoute, HomeRouterParamList, MainRoute} from "types";

const AdminScreen: FC = () => {
  const { params } = useRoute<RouteProp<HomeRouterParamList, HomeRoute.Admin>>()
  const { goBack, navigate } = useNavigation()

  const [filter, setFilter] = useState<Filter>("all")

  const colors = useColor({
    bg: {
      color: "white",
    },
    button: {
      color: "stadium_orange"
    }
  })

  const onPressBack = () => {
    if (params && params.params && params.params.fromAdmin) {
      // @ts-ignore
      navigate(MainRoute.Menu)
    } else {
      goBack()
    }
  }

  const onFilterChange = (itemValue: string) => {
    setFilter(itemValue as Filter)
  }

  return (
    <Screen
      bgColor={colors.bg}
      px={0}
    >
      <VStack px="0.5">
        <VStack px="5">
          <Toolbar back onPressBack={onPressBack}/>
          <Row alignItems="center" justifyContent="space-between" mt="5">
            <Box flexGrow={1}>
              <Typography width="100%" variant="h2" fontSize="4xl" bold>
                Events.
              </Typography>
            </Box>
            <Box width="40%">
              <Select
                borderColor="black"
                width="100%"
                placeholder="Filter"
                placeholderTextColor="black"
                items={[
                  { value: "all", label: "All" },
                  { value: "activity", label: "Activities" },
                  { value: "workshop", label: "Workshops" },
                  { value: "food", label: "Food" }
                ]}
                onValueChange={onFilterChange}
                py="2"
                borderRadius="xl"
              />
            </Box>
          </Row>
        </VStack>
        <EventList filter={filter} />
      </VStack>
    </Screen>
  )
}

export default AdminScreen