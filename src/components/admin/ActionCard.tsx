import React, {FC} from "react";
import {Box, Flex, Pressable} from "native-base";
import {IActionCardProps} from "types";
import {useColor, useShadow} from "assets/styles/theme";

const ActionCard: FC<IActionCardProps> = ({ icon, children, onPress }) => {
  const cardColor = useColor({
    color: "white",
  })

  return (
    <Pressable
      alignItems="center"
      backgroundColor={cardColor}
      width="48%"
      height={150}
      onPress={onPress} rounded="lg" style={useShadow()}
      py="2"
      px="2"
    >
      <Flex justifyContent="center" alignItems="center" width="full" height="50%">
        { icon }
      </Flex>
      { children }
    </Pressable>
  )
}

export default ActionCard