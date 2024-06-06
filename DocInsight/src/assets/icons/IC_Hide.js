import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      d="M9.8 8.223c-.33.252-.594.556-.777.893a2.344 2.344 0 0 0-.29 1.07c-.007.37.075.737.244 1.08.168.341.42.653.737.914.318.26.697.467 1.114.605.418.138.864.206 1.314.2.45-.007.894-.088 1.305-.238.41-.15.78-.367 1.087-.637m-3.786-8.287c.47-.049.945-.073 1.419-.073 7.816 0 11.166 6.417 11.166 6.417-.5.877-1.125 1.702-1.864 2.456"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      d="M6.148 5.226c-2.222 1.24-4 2.946-5.148 4.94 0 0 3.35 6.417 11.167 6.417 2.139.005 4.233-.508 6.018-1.476M1 1l22.333 18.333"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
