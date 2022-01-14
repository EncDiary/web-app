import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { registerPanelEnum } from "../../types/register";
import Button from "../Generic/Button";
import { NextNavigation } from "../Generic/NextBackNavigation";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";

interface RegisterStartProps {
  setPanel: Dispatch<SetStateAction<registerPanelEnum>>;
}

const RegisterStart: FC<RegisterStartProps> = ({ setPanel }) => {
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
        <Button
          text="Start"
          size="large"
          onClick={() => setPanel(registerPanelEnum.username)}
        />
      </NextNavigation>
      <hr />
      <TextBlock size="small">
        Уже есть аккаунт? <Link to="/login">Логин</Link>
      </TextBlock>
    </>
  );
};

export default RegisterStart;
