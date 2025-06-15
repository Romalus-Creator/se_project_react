import * as React from "react";
import { useContext } from "react";
import CurrentTemperatureContext from "../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureContext
  );

  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch_checkbox"
      />
      <span
        className={`toggle-switch_F  ${
          currentTemperatureUnit === "F" ? "toggle-switch_temp-icon" : ""
        }`}
      >
        {/* {console.log(checked)}*/}F
      </span>
      <span
        className={`toggle-switch_C  ${
          currentTemperatureUnit === "C" ? "toggle-switch_temp-icon" : ""
        }`}
      >
        C
      </span>
    </label>
  );
}

// const Checkbox = () => {
//   return (
// <div>
//       <Checkbox label="My Value" value={checked} onChange={handleChange} />

//       <p>Is "My Value" checked? {checked.toString()}</p>
//     </div>
//   );
// };

export default ToggleSwitch;
