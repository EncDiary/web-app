import { FC, useState } from "react";
import { registerPanelEnum } from "../../types/register";
import UnauthorizedWrapper from "../Generic/UnauthorizedWrapper";
import RegisterDonate from "../Register/RegisterDonate";
import RegisterSecret from "../Register/RegisterSecret";
import RegisterStart from "../Register/RegisterStart";
import RegisterUsername from "../Register/RegisterUsername";

const Register: FC = () => {
  const [currentRegisterPanel, setCurrentRegisterPanel] = useState(
    registerPanelEnum.start
  );

  const switchRegisterPanel = (currentRegisterPanel: registerPanelEnum) => {
    switch (currentRegisterPanel) {
      case registerPanelEnum.start:
        return (
          <RegisterStart setCurrentRegisterPanel={setCurrentRegisterPanel} />
        );
      case registerPanelEnum.username:
        return (
          <RegisterUsername setCurrentRegisterPanel={setCurrentRegisterPanel} />
        );
      case registerPanelEnum.secret:
        return (
          <RegisterSecret setCurrentRegisterPanel={setCurrentRegisterPanel} />
        );
      case registerPanelEnum.donate:
        return (
          <RegisterDonate setCurrentRegisterPanel={setCurrentRegisterPanel} />
        );
    }
  };

  return (
    <UnauthorizedWrapper>
      {switchRegisterPanel(currentRegisterPanel)}
    </UnauthorizedWrapper>
  );
};

export default Register;
