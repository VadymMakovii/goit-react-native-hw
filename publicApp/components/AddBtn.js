import Svg, { Circle, Path } from "react-native-svg";

const AddBtn = () => {
  return (
    <Svg width="25" height="25" viewBox="0 0 25 25">
      <Circle cx="12.5" cy="12.5" r="12" fill="white" stroke="#FF6C00" />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z"
        fill="#FF6C00"
      />
    </Svg>
  );
};

export default AddBtn;