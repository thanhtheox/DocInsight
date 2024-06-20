import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="m13.166 3.833-1.175 1.175 2.15 2.159H5.667v1.666h8.476l-2.15 2.15 1.174 1.184L17.334 8l-4.166-4.167ZM2.333 2.167H9V.5H2.333C1.416.5.667 1.25.667 2.167v11.666c0 .917.75 1.667 1.666 1.667H9v-1.667H2.333V2.167Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
