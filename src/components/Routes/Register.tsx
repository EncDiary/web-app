import { FC, useState } from "react";
import RegisterProcess from "../Register/RegisterProcess";
import RegisterStart from "../Register/RegisterStart";

const Register: FC = () => {
  const [isStarted, setIsStarted] = useState(false);

  return !isStarted ? (
    <RegisterStart goToNextPanel={() => setIsStarted(true)} />
  ) : (
    <RegisterProcess />
  );
};

export default Register;
