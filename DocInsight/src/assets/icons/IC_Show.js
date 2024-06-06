import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      d="M9 4.497c.97-.245 1.982-.368 3-.366 4.182 0 7.028 1.99 8.725 3.746.85.88 1.275 1.32 1.275 2.624 0 1.306-.425 1.745-1.275 2.625-1.697 1.755-4.543 3.746-8.725 3.746-4.182 0-7.028-1.991-8.725-3.746C2.425 12.246 2 11.806 2 10.5c0-1.306.425-1.744 1.275-2.624A13.022 13.022 0 0 1 5 6.377"
    />
    <Path
      stroke="#000"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      d="M15 10.502c0 .634-.316 1.241-.879 1.69-.562.447-1.325.7-2.121.7s-1.559-.253-2.121-.7C9.316 11.742 9 11.135 9 10.501c0-.633.316-1.241.879-1.689.562-.448 1.325-.7 2.121-.7s1.559.252 2.121.7c.563.448.879 1.056.879 1.69Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
