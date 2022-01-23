import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../Generic/Button";
import { NextNavigation } from "../Generic/NextBackNavigation";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";

interface RegisterStartProps {
  goToNextPanel: () => void;
}

const RegisterStart: FC<RegisterStartProps> = ({ goToNextPanel }) => {
  return (
    <>
      <Title text="Register" size="largest" />
      <TextBlock size="large">
        This wizard will help you create your WebDiary account.
      </TextBlock>
      <TextBlock size="large">
        You will be prompted to choose username and password
      </TextBlock>
      <NextNavigation>
        <Button size="large" onClick={goToNextPanel}>
          Start
        </Button>
      </NextNavigation>
      <hr />
      <TextBlock size="small">
        Уже есть аккаунт? <Link to="/login">Логин</Link>
      </TextBlock>
    </>
  );
};

export default RegisterStart;
