import React from "react";

interface HotkeyItemProps {
  combination: string;
  description: string;
}

const HotkeyItem: React.FC<HotkeyItemProps> = ({
  combination,
  description,
}) => {
  return (
    <div className="hotkey__item">
      <span className="hotkey__combination">{combination}</span>
      <span className="hotkey__description">{description}</span>
    </div>
  );
};

export default HotkeyItem;
