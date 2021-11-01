import { Dispatch, FC, SetStateAction } from "react";
import { registerPanelEnum } from "../../types/register";
import Button from "../Generic/Button";
import { NextNavigation } from "../Generic/NextBackNavigation";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";

interface RegisterStartProps {
  setCurrentRegisterPanel: Dispatch<SetStateAction<registerPanelEnum>>;
}

const RegisterStart: FC<RegisterStartProps> = ({ setCurrentRegisterPanel }) => {
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
          onClick={() => setCurrentRegisterPanel(registerPanelEnum.username)}
        />
      </NextNavigation>
    </>
  );
};

export default RegisterStart;
