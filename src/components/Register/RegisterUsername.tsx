import { Dispatch, FC, SetStateAction } from "react";
import { registerPanelEnum } from "../../types/register";
import Button from "../Generic/Button";
import { TextInput } from "../Generic/Input";
import { NextNavigation } from "../Generic/NextBackNavigation";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";

interface RegisterUsernameProps {
  setCurrentRegisterPanel: Dispatch<SetStateAction<registerPanelEnum>>;
  username: string;
  setFormValues: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isValidate: boolean;
}

const RegisterUsername: FC<RegisterUsernameProps> = ({
  setCurrentRegisterPanel,
  username,
  setFormValues,
  isValidate,
}) => {
  return (
    <>
      <Title text="Username" size="largest" />
      <TextInput
        placeholder="Username"
        type="text"
        size="large"
        value={username}
        onChange={setFormValues}
        name="username"
      />
      <TextBlock size="small">
        Username and dates of notes are the only things that are not encrypted.
        Username is used when logging in to WebDiary.
      </TextBlock>
      <NextNavigation>
        <Button
          text="Next"
          size="large"
          onClick={() => setCurrentRegisterPanel(registerPanelEnum.secret)}
          disabled={!isValidate}
        />
      </NextNavigation>
    </>
  );
};

export default RegisterUsername;
