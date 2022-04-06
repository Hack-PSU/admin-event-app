import React, {FC} from "react";
import {Box, Center, IIconProps, Pressable, VStack, Icon as NativeIcon} from "native-base";
import {useColor, useShadow} from "assets/styles/theme";
import {Typography} from "components/base";

interface IMenuCardProps {
  icon: JSX.Element
  label: string
}

const MenuCard: FC<IMenuCardProps> = ({ icon, label }) => {
  const shadow = useShadow()
  const colors = useColor({
    bg: {
      color: "white"
    }
  })

  return (
    <Box
      width="100%"
      height={150}
      style={shadow}
      backgroundColor={colors.bg}
      px="2"
      py="2"
      rounded="xl"
    >
      <VStack space="md" justifyContent="center" alignItems="center" height="100%">
        <NativeIcon
          as={icon}
          size="xl"
        />
        <Typography variant="sub1" bold>
          { label }
        </Typography>
      </VStack>
    </Box>
  )
}

export default MenuCard