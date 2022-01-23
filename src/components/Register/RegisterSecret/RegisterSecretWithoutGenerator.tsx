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
        EncDiary проверим соответствие ваших ключей друг другу, используя ваш
        закрытый ключ прямо браузере, прежде чем создавать учетную запись.
      </TextBlock>
      <TextBlock size="small">
        EncDiary не хранит ваши пароли. Отнеситесь к хранению и созданию очень
        ответственно. При утере пароля невозможно восстановить ваши записи.
        Используя ненадежный пароль вы рискуете скомпрометировать свои записи.
        Разработчик за ваши данные ответственности не несет
      </TextBlock>
    </>
  );
};

export default RegisterSecretWithoutGenerator;
