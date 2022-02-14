import {FC} from "react";
import {IToolbarProps} from "types";
import {useNavigation} from "@react-navigation/native";
import {Row} from "native-base";
import Icon from "components/base/Icon";
import {useColor} from "assets/styles/theme";

const Toolbar: FC<IToolbarProps> = ({ color,back, width, height }) => {
  const { goBack } = useNavigation()
  const {values} = useColor({
    defaultFill: {
      color: "black"
    }
  })

  return (
    <Row justifyContent="flex-start" mt="2">
      { back ?
        <Icon name="arrow-back-outline" onPress={goBack} fill={color ?? values.defaultFill}
          width={width ?? 30} height={height ?? 30}
        />
        :
        <Icon name="close-outline" onPress={goBack} fill={color ?? values.defaultFill}
          width={width ?? 30} height={height ?? 30}
        />
      }
    </Row>
  )
}

export default Toolbar