import { Dispatch, FC, SetStateAction } from "react";
import { registerPanelEnum } from "../../types/register";
import Button from "../Generic/Button";
import FileInput from "../Generic/Input/FileInput";
import { NextBackNavigation } from "../Generic/NextBackNavigation";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";

interface RegisterSecretProps {
  setCurrentRegisterPanel: Dispatch<SetStateAction<registerPanelEnum>>;
  isValid: boolean;
  setPrivateKeyText: (text: string) => void;
  privateKeyName: string;
  setPrivateKeyName: (name: string) => void;
  setPublicKeyText: (text: string) => void;
  publicKeyName: string;
  setPublicKeyName: (name: string) => void;
}

const RegisterSecret: FC<RegisterSecretProps> = ({
  setCurrentRegisterPanel,
  isValid,
  setPrivateKeyText,
  privateKeyName,
  setPrivateKeyName,
  setPublicKeyText,
  publicKeyName,
  setPublicKeyName,
}) => {
  return (
    <>
      <Title text="Secret" size="largest" />
      <FileInput
        id="register-upload-privkey"
        description="Приватный ключ"
        fileName={privateKeyName}
        setFileName={setPrivateKeyName}
        setFileText={setPrivateKeyText}
      />
      <FileInput
        id="register-upload-pubkey"
        description="Публичный ключ"
        fileName={publicKeyName}
        setFileName={setPublicKeyName}
        setFileText={setPublicKeyText}
      />
      <TextBlock size="small">
        EncDiary проверим соответствие ваших ключей друг другу, используя ваш
        закрытый ключ прямо браузере, прежде чем создавать учетную запись.
      </TextBlock>
      <TextBlock size="small">
        EncDiary не хранит ваши пароли. Отнеситесь к хранению и созданию очень
        ответственно. При утере пароля невозможно восстановить ваши записи.
        Используя ненадежный пароль вы рискуете скомпрометировать свои записи.
        Разработчик за ваши данные ответственности не несет
      </TextBlock>
      <NextBackNavigation>
        <Button
          text="Back"
          colorTheme="secondary"
          size="large"
          onClick={() => setCurrentRegisterPanel(registerPanelEnum.username)}
        />
        <Button
          text="Next"
          size="large"
          onClick={() => setCurrentRegisterPanel(registerPanelEnum.donate)}
          disabled={!isValid}
        />
      </NextBackNavigation>
    </>
  );
};

export default RegisterSecret;
