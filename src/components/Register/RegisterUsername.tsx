import { Dispatch, FC, SetStateAction } from "react";
import { registerPanelEnum } from "../../types/register";
import { PrimaryButton } from "../Generic/Button";
import Explanation from "../Generic/Explanation";
import { TextInput } from "../Generic/Input";
import { NextNavigation } from "../Generic/NextBackNavigation";
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
      <Title text="Username" />
      <TextInput placeholder="Username" type="text" />
      <Explanation>
        Username and dates of notes are the only things that are not encrypted.
        Username is used when logging in to WebDiary.
      </Explanation>
      <NextNavigation>
        <PrimaryButton
          text="Next"
          clickHandler={() => setCurrentRegisterPanel(registerPanelEnum.secret)}
        />
      </NextNavigation>
    </>
  );
};

export default RegisterUsername;
