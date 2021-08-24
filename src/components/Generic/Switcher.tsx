import React from "react";

interface SwitcherProps {
  name: string;
  isEnabled: boolean;
  handleChange: () => void;
}

const Switcher: React.FC<SwitcherProps> = ({
  name,
  isEnabled,
  handleChange,
}) => {
  return (
    <div className="switcher">
      <label className="checkbox-ios">
        <input type="checkbox" checked={isEnabled} onChange={handleChange} />
        <span className="checkbox-ios-switch"></span>
      </label>
      {name}
    </div>
  );
};

export default Switcher;
