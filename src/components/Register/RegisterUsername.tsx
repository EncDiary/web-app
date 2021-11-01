import { Dispatch, FC, SetStateAction } from "react";
import { registerPanelEnum } from "../../types/register";
import Button from "../Generic/Button";
import { TextInput } from "../Generic/Input";
import { NextNavigation } from "../Generic/NextBackNavigation";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import RegisterBullet from "./RegisterBullet";

interface RegisterUsernameProps {
  setCurrentRegisterPanel: Dispatch<SetStateAction<registerPanelEnum>>;
}

const RegisterUsername: FC<RegisterUsernameProps> = ({
  setCurrentRegisterPanel,
}) => {
  return (
    <>
      <RegisterBullet
        clickHandlers={[
          () => setCurrentRegisterPanel(registerPanelEnum.username),
          () => setCurrentRegisterPanel(registerPanelEnum.secret),
          () => setCurrentRegisterPanel(registerPanelEnum.donate),
        ]}
        currentPanelNum={1}
      />
      <Title text="Username" size="largest" />
      <TextInput placeholder="Username" type="text" size="large" />
      <TextBlock size="small">
        Username and dates of notes are the only things that are not encrypted.
        Username is used when logging in to WebDiary.
      </TextBlock>
      <NextNavigation>
        <Button
          text="Next"
          size="large"
          onClick={() => setCurrentRegisterPanel(registerPanelEnum.secret)}
        />
      </NextNavigation>
    </>
  );
};

export default RegisterUsername;
