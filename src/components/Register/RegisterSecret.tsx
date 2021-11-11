import { Dispatch, FC, SetStateAction } from "react";
import { registerPanelEnum } from "../../types/register";
import Button from "../Generic/Button";
import { FileInput } from "../Generic/Input";
import { NextBackNavigation } from "../Generic/NextBackNavigation";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";

interface RegisterSecretProps {
  setCurrentRegisterPanel: Dispatch<SetStateAction<registerPanelEnum>>;
  isValidate: boolean;
  setFileText: (text: string) => void;
  fileName: string;
  setFileName: (name: string) => void;
}

const RegisterSecret: FC<RegisterSecretProps> = ({
  setCurrentRegisterPanel,
  isValidate,
  setFileText,
  fileName,
  setFileName,
}) => {
  return (
    <>
      <Title text="Secret" size="largest" />
      <FileInput
        description="Приватный ключ"
        fileName={fileName}
        setFileName={setFileName}
        setFileText={setFileText}
      />
      <TextBlock size="small">
        Хороший пароль должен содержать как минимум: 16 символов, 2 заглавные
        буквы, 2 строчные, 2 цифры и 2 специальных символа
      </TextBlock>
      <TextBlock size="small">
        WebDiary не хранит ваши пароли. Отнеситесь к хранению и созданию очень
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
          disabled={!isValidate}
        />
      </NextBackNavigation>
    </>
  );
};

export default RegisterSecret;
