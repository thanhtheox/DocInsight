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
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15.5H7.5c-1.396 0-2.093 0-2.661.172a4 4 0 0 0-2.667 2.667C2 18.907 2 19.604 2 21m17 0v-6m-3 3h6M14.5 7.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
