import {FC} from "react";
import {IToolbarProps} from "types";
import {useNavigation} from "@react-navigation/native";
import {Row} from "native-base";
import Icon from "components/base/Icon";
import {useColor} from "assets/styles/theme";

const Toolbar: FC<IToolbarProps> = ({ right, onPressBack, color,back, width, height }) => {
  const { goBack } = useNavigation()
  const colors = useColor({
    defaultFill: {
      color: "black"
    }
  })

  return (
    <Row justifyContent={right ? "flex-end" : "flex-start"} mt="2">
      { back ?
        <Icon name="arrow-back-outline" onPress={onPressBack ?? goBack} fill={color ?? colors.defaultFill}
          width={width ?? 30} height={height ?? 30}
        />
        :
        <Icon name="close-outline" onPress={onPressBack ?? goBack} fill={color ?? colors.defaultFill}
          width={width ?? 30} height={height ?? 30}
        />
      }
    </Row>
  )
}

export default Toolbar