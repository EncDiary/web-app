import { Dispatch, FC, SetStateAction } from "react";
import { registerPanelEnum } from "../../types/register";
import "./RegisterBullet.scss";

interface RegisterBulletProps {
  panels: registerPanelEnum[];
  currentPanelNumber: number;
  setPanelNumber: Dispatch<SetStateAction<number>>;
  availablePanelNumber: number;
}

interface RegisterBulletItemProps {
  isActive: boolean;
  onClick: () => void;
  disabled: boolean;
}

const RegisterBullet: FC<RegisterBulletProps> = ({
  panels,
  currentPanelNumber,
  setPanelNumber,
  availablePanelNumber,
}) => {
  return (
    <div className="bullets">
      {panels.map((panel, panelNumber) => (
        <RegisterBulletItem
          isActive={panelNumber === currentPanelNumber}
          onClick={() => setPanelNumber(panelNumber)}
          disabled={panelNumber > availablePanelNumber}
          key={panel}
        />
      ))}
    </div>
  );
};

const RegisterBulletItem: FC<RegisterBulletItemProps> = ({
  isActive,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`bullet${isActive ? "_checked" : ""}`}
      onClick={onClick}
      disabled={disabled}
    ></button>
  );
};

export default RegisterBullet;
