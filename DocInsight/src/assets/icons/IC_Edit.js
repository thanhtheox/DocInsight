import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1.667 14.333 3.7-1.422c.236-.091.354-.137.465-.196.098-.053.192-.114.28-.183.1-.077.189-.166.368-.345L14 4.667A1.886 1.886 0 1 0 11.333 2l-7.52 7.52a4.16 4.16 0 0 0-.345.368 2 2 0 0 0-.182.28c-.06.11-.105.23-.196.466l-1.423 3.7Zm0 0 1.372-3.567c.098-.255.147-.383.231-.441a.333.333 0 0 1 .253-.054c.1.02.197.116.39.31l1.507 1.505c.193.194.29.29.31.391a.333.333 0 0 1-.054.253c-.059.084-.187.133-.442.231l-3.567 1.372Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
