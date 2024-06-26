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
      fill="#000"
      fillRule="evenodd"
      d="M8.325 6.998 6.817 4.943a.327.327 0 0 0-.442-.082C4.403 6.138 3.861 8.087 4.652 9.524c.865 1.572 2.2 3.5 4.248 5.547 2.047 2.048 3.974 3.382 5.546 4.248 1.438.791 3.387.249 4.663-1.724a.327.327 0 0 0-.08-.441l-2.057-1.508a1 1 0 0 0-1.038-.088l-.82.41c-.697.348-1.652.47-2.557.005-.604-.31-1.536-.902-2.597-1.963-1.06-1.06-1.652-1.992-1.963-2.597-.465-.904-.342-1.86.006-2.557l.41-.819a1 1 0 0 0-.088-1.039ZM5.289 3.182C2.749 4.826 1.44 7.838 2.9 10.49c.953 1.73 2.4 3.81 4.585 5.996 2.186 2.186 4.267 3.633 5.997 4.586 2.65 1.46 5.663.151 7.306-2.39a2.327 2.327 0 0 0-.577-3.14l-2.056-1.508a3 3 0 0 0-3.116-.264l-.82.41a.822.822 0 0 1-.747.016c-.43-.221-1.19-.692-2.098-1.599-.906-.907-1.377-1.668-1.598-2.098a.822.822 0 0 1 .016-.747l.41-.82a3 3 0 0 0-.264-3.115L8.43 3.76a2.327 2.327 0 0 0-3.141-.578Z"
      clipRule="evenodd"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export default Memo
