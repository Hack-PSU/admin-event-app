import React, {FC} from "react";
import {Box} from "native-base";
import {Typography} from "components/base/index";

const InputBlock: FC<{ label: string }> = ({ label, children }) => {
  return (
    <Box mt="3">
      <Typography variant="body1" fontSize="md">
        { label }
      </Typography>
      { children }
    </Box>
  )
}

export default InputBlock