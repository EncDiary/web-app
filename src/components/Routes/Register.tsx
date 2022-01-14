import { FC, useState } from "react";
import { registerPanelEnum } from "../../types/register";
import RegisterProcess from "../Register/RegisterProcess";
import RegisterStart from "../Register/RegisterStart";

const Register: FC = () => {
  const [panel, setPanel] = useState(registerPanelEnum.start);

  return panel === registerPanelEnum.start ? (
    <RegisterStart setPanel={setPanel} />
  ) : (
    <RegisterProcess panel={panel} setPanel={setPanel} />
  );
};

export default Register;
