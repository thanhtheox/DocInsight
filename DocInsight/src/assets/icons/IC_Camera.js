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
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2 8.377c0-.35 0-.525.015-.673a3 3 0 0 1 2.69-2.69C4.851 5 5.035 5 5.404 5c.143 0 .214 0 .274-.004a2 2 0 0 0 1.735-1.25c.023-.056.044-.12.086-.246.042-.127.063-.19.086-.246a2 2 0 0 1 1.735-1.25C9.38 2 9.448 2 9.58 2h4.838c.133 0 .2 0 .26.004a2 2 0 0 1 1.735 1.25c.023.056.044.12.086.246.042.127.063.19.086.246a2 2 0 0 0 1.735 1.25c.06.004.131.004.273.004.37 0 .554 0 .702.015a3 3 0 0 1 2.69 2.69c.014.147.014.322.014.672V16.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C19.72 21 18.88 21 17.2 21H6.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C2 18.72 2 17.88 2 16.2V8.377Z"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 16.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
