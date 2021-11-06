import { FC, useState } from "react";
import { registerPanelEnum } from "../../types/register";
import UnauthorizedWrapper from "../Generic/UnauthorizedWrapper";
import RegisterProcess from "../Register/RegisterProcess";
import RegisterStart from "../Register/RegisterStart";

const Register: FC = () => {
  const [currentRegisterPanel, setCurrentRegisterPanel] = useState(
    registerPanelEnum.start
  );

  return (
    <UnauthorizedWrapper>
      {currentRegisterPanel === registerPanelEnum.start ? (
        <RegisterStart setCurrentRegisterPanel={setCurrentRegisterPanel} />
      ) : (
        <RegisterProcess
          currentRegisterPanel={currentRegisterPanel}
          setCurrentRegisterPanel={setCurrentRegisterPanel}
        />
      )}
    </UnauthorizedWrapper>
  );
};

export default Register;
