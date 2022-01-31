import { FC } from "react";
import Button from "../../Generic/Button";
import { NextBackNavigation } from "../../Generic/NextBackNavigation";
import TextBlock from "../../Generic/TextBlock";
import Title from "../../Generic/Title";
import RegisterSecretWithGenerator from "./RegisterSecretWithGenerator";
import RegisterSecretWithoutGenerator from "./RegisterSecretWithoutGenerator";

interface RegisterSecretProps {
  useGenerator: boolean;
  goToNextPanel: () => void;
  goToPrevPanel: () => void;
  isValid: boolean;
  setPrivateKeyText: (text: string) => void;
  privateKeyName: string;
  setPrivateKeyName: (name: string) => void;
  setPublicKeyText: (text: string) => void;
  publicKeyName: string;
  setPublicKeyName: (name: string) => void;
  publicKeyText: string;
  privateKeyText: string;
}

const RegisterSecret: FC<RegisterSecretProps> = ({
  goToNextPanel,
  goToPrevPanel,
  isValid,
  setPrivateKeyText,
  privateKeyName,
  setPrivateKeyName,
  setPublicKeyText,
  publicKeyName,
  setPublicKeyName,
  useGenerator,
  publicKeyText,
  privateKeyText,
}) => {
  return (
    <>
      <Title size="largest">RSA ключи</Title>
      {useGenerator ? (
        <RegisterSecretWithGenerator
          setPrivateKeyText={setPrivateKeyText}
          setPublicKeyText={setPublicKeyText}
          privateKeyText={privateKeyText}
          publicKeyText={publicKeyText}
        />
      ) : (
        <RegisterSecretWithoutGenerator
          setPrivateKeyText={setPrivateKeyText}
          privateKeyName={privateKeyName}
          setPrivateKeyName={setPrivateKeyName}
          setPublicKeyText={setPublicKeyText}
          publicKeyName={publicKeyName}
          setPublicKeyName={setPublicKeyName}
        />
      )}

      <TextBlock size="small">
        EncDiary хранит лишь ваш публичный ключ - для возможности проверки
        владения учетной записью. Приватный ключ не передается на сервер. При
        утере приватного ключа восстановить записи технически не представляется
        возможным.
      </TextBlock>

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

export default RegisterSecret;
