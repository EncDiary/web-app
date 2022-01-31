import { FC } from "react";
import FileInput from "../../Generic/Input/FileInput";
import TextBlock from "../../Generic/TextBlock";

interface RegisterSecretWithoutGeneratorProps {
  setPrivateKeyText: (text: string) => void;
  privateKeyName: string;
  setPrivateKeyName: (name: string) => void;
  setPublicKeyText: (text: string) => void;
  publicKeyName: string;
  setPublicKeyName: (name: string) => void;
}

const RegisterSecretWithoutGenerator: FC<
  RegisterSecretWithoutGeneratorProps
> = ({
  privateKeyName,
  setPrivateKeyName,
  setPrivateKeyText,
  publicKeyName,
  setPublicKeyName,
  setPublicKeyText,
}) => {
  return (
    <>
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
        Выбранные ключи должны быть в PEM формате.
      </TextBlock>
      <TextBlock size="small">
        Ваши ключи будут проверены на соответствие перед созданием аккаунта.
      </TextBlock>
    </>
  );
};

export default RegisterSecretWithoutGenerator;
