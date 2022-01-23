import { FC } from "react";
import Button from "../Generic/Button";
import TextInput from "../Generic/Input/TextInput";
import { NextNavigation } from "../Generic/NextBackNavigation";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";

interface RegisterUsernameProps {
  goToNextPanel: () => void;
  username: string;
  setFormValues: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

const RegisterUsername: FC<RegisterUsernameProps> = ({
  goToNextPanel,
  username,
  setFormValues,
  isValid,
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
        <Button size="large" onClick={goToNextPanel} disabled={!isValid}>
          Next
        </Button>
      </NextNavigation>
    </>
  );
};

export default RegisterUsername;
