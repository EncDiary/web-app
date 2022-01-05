import { FC, useState } from "react";
import { registerPanelEnum } from "../../types/register";
import RegisterProcess from "../Register/RegisterProcess";
import RegisterStart from "../Register/RegisterStart";

const Register: FC = () => {
  const [currentRegisterPanel, setCurrentRegisterPanel] = useState(
    registerPanelEnum.start
  );

  return currentRegisterPanel === registerPanelEnum.start ? (
    <RegisterStart setCurrentRegisterPanel={setCurrentRegisterPanel} />
  ) : (
    <RegisterProcess
      currentRegisterPanel={currentRegisterPanel}
      setCurrentRegisterPanel={setCurrentRegisterPanel}
    />
  );
};

export default Register;
