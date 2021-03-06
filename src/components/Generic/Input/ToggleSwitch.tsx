import { FC } from "react";
import "./ToggleSwitch.scss";

interface ToggleSwitchProps {
  text: string;
  isEnabled: boolean;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  text,
  isEnabled,
  changeHandler,
}) => {
  return (
    <div className="switch">
      <label className="switch__control">
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={changeHandler}
          className="switch__control-input"
        />
        <span className="switch__control-inner"></span>
      </label>
      {text}
    </div>
  );
};

export default ToggleSwitch;
