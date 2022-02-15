import {FC} from "react";
import {Factory, Pressable} from "native-base";
import { Icon as EvaIcon, IconProps } from "react-native-eva-icons";
import {useColor} from "assets/styles/theme";

export const ClearIcon: FC<{ clear: () => void }> = ({ clear }) =>
  <Pressable onPress={clear} mr="2">
    <Icon name="close-outline" fill="#bfbfbf" />
  </Pressable>

const Icon: FC<IconProps> = ({ children, fill, name, ...props }) => {
  const colors = useColor({
    defaultFill: {
      color: "stadium_orange"
    }
  })

  return (
    <EvaIcon name={name} fill={fill ?? "#f24e27"} width={23} height={23} {...props} />
  )
}

export default Icon
