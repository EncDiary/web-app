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
      <Title size="largest">Юзернейм</Title>
      <TextInput
        placeholder="Username"
        type="text"
        size="large"
        value={username}
        onChange={setFormValues}
        name="username"
      />
      <TextBlock size="small">
        Юзернейм должен состоять минимум из 5 символов. Разрешенные символы:
        латинские буквы, цифры, символ нижнего подчеркивания (_).
      </TextBlock>
      <TextBlock size="small">
        Юзернейм не может начинаться с цифры. Нижнее подчеркивания может
        использоваться только в середине юзернейма
      </TextBlock>
      <NextNavigation>
        <Button size="large" onClick={goToNextPanel} disabled={!isValid}>
          Далее
        </Button>
      </NextNavigation>
    </>
  );
};

export default RegisterUsername;
