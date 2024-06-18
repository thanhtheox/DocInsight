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
      d="m17.164 15.836-3.18-3.18a7.415 7.415 0 0 0 1.579-4.594 7.5 7.5 0 1 0-7.5 7.5 7.415 7.415 0 0 0 4.593-1.578l3.18 3.18a.946.946 0 0 0 1.328 0 .937.937 0 0 0 0-1.328ZM2.437 8.062a5.625 5.625 0 1 1 5.626 5.626 5.633 5.633 0 0 1-5.626-5.626Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
