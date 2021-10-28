import { FC } from "react";
import "./RegisterBullet.scss";

interface RegisterBulletProps {
  clickHandlers: (() => void)[];
  currentPanelNum?: number;
}

interface RegisterBulletItemProps {
  currentPanelNum: number;
  panelNum: number;
  clickHandler: () => void;
}

const RegisterBullet: FC<RegisterBulletProps> = ({
  clickHandlers,
  currentPanelNum = 1,
}) => {
  return (
    <div className="bullets">
      {clickHandlers.map((clickHandler, panelNum) => {
        return (
          <RegisterBulletItem
            currentPanelNum={currentPanelNum}
            panelNum={panelNum}
            clickHandler={clickHandler}
            key={panelNum}
          />
        );
      })}
    </div>
  );
};

const RegisterBulletItem: FC<RegisterBulletItemProps> = ({
  currentPanelNum,
  panelNum,
  clickHandler,
}) => {
  return (
    <div
      className={`bullet${currentPanelNum === panelNum + 1 ? "_checked" : ""}`}
      onClick={clickHandler}
    ></div>
  );
};

export default RegisterBullet;
