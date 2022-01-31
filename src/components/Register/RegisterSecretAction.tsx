import { FC } from "react";
import Button from "../Generic/Button";
import RadioInput from "../Generic/Input/RadioInput";
import { NextBackNavigation } from "../Generic/NextBackNavigation";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import "./RegisterSecretAction.scss";

interface RegisterSecretActionProps {
  goToNextPanel: () => void;
  goToPrevPanel: () => void;
  isValid: boolean;
  secretAction: "generate" | "use-own-keys" | undefined;
  setSecretAction: React.Dispatch<
    React.SetStateAction<"generate" | "use-own-keys" | undefined>
  >;
  clearFiles: () => void;
}

const RegisterSecretAction: FC<RegisterSecretActionProps> = ({
  goToNextPanel,
  goToPrevPanel,
  isValid,
  secretAction,
  setSecretAction,
  clearFiles,
}) => {
  return (
    <>
      <Title size="largest">RSA ключи</Title>
      <TextBlock size="large">Выберите подходящее действие:</TextBlock>
      <div className="secret-type__choosing">
        <RadioInput
          id="generate"
          checked={secretAction === "generate"}
          onChange={() => {
            setSecretAction("generate");
            clearFiles();
          }}
          name="secret_type"
          value={secretAction}
        >
          Сгенерировать ключи сейчас
        </RadioInput>

        <RadioInput
          id="use-own-keys"
          checked={secretAction === "use-own-keys"}
          onChange={() => {
            setSecretAction("use-own-keys");
            clearFiles();
          }}
          name="secret_type"
          value={secretAction}
        >
          Я хочу использовать свои ключи
        </RadioInput>
      </div>

      <NextBackNavigation>
        <Button colorTheme="secondary" size="large" onClick={goToPrevPanel}>
          Назад
        </Button>
        <Button size="large" onClick={goToNextPanel} disabled={!isValid}>
          Далее
        </Button>
      </NextBackNavigation>
    </>
  );
};

export default RegisterSecretAction;
