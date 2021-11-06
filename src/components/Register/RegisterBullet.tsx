import { Dispatch, FC, SetStateAction } from "react";
import { registerPanelEnum } from "../../types/register";
import "./RegisterBullet.scss";

interface RegisterBulletProps {
  panels: registerPanelEnum[];
  currentPanel: registerPanelEnum;
  setCurrentPanel: Dispatch<SetStateAction<registerPanelEnum>>;
  currentPanelNumber: number;
}

interface RegisterBulletItemProps {
  isActive: boolean;
  onClick: () => void;
  disabled: boolean;
}

const RegisterBullet: FC<RegisterBulletProps> = ({
  panels,
  currentPanel,
  setCurrentPanel,
  currentPanelNumber,
}) => {
  return (
    <div className="bullets">
      {panels.map((panel, panelNumber) => (
        <RegisterBulletItem
          isActive={panel === currentPanel}
          onClick={() => setCurrentPanel(panel)}
          disabled={panelNumber + 1 > currentPanelNumber}
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
