import {FC} from "react";
import {Pressable} from "native-base";
import { Icon as EvaIcon, IconProps } from "react-native-eva-icons";

export const ClearIcon: FC<{ clear: () => void }> = ({ clear }) =>
  <Pressable onPress={clear} mr="2">
    <Icon name="close-outline" fill="#bfbfbf" />
  </Pressable>

const Icon: FC<IconProps> = ({ children, fill, name, ...props }) => {
  return (
    <EvaIcon name={name} fill={fill ?? "#f25959"} width={23} height={23} {...props} />
  )
}

export default Icon