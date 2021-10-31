import { Dispatch, FC, SetStateAction } from "react";
import { registerPanelEnum } from "../../types/register";
import Button from "../Generic/Button";
import Explanation from "../Generic/Explanation";
import { TextInput } from "../Generic/Input";
import { NextBackNavigation } from "../Generic/NextBackNavigation";
import Title from "../Generic/Title";
import RegisterBullet from "./RegisterBullet";

interface RegisterSecretProps {
  setCurrentRegisterPanel: Dispatch<SetStateAction<registerPanelEnum>>;
}

const RegisterSecret: FC<RegisterSecretProps> = ({
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
        currentPanelNum={2}
      />
      <Title text="Secret" size="largest" />
      <TextInput placeholder="Password" type="password" />
      <Explanation>
        Хороший пароль должен содержать как минимум: 16 символов, 2 заглавные
        буквы, 2 строчные, 2 цифры и 2 специальных символа
      </Explanation>
      <Explanation>
        WebDiary не хранит ваши пароли. Отнеситесь к их хранению очень
        ответственно. При утере пароля невозможно восстановить ваши заметки.
      </Explanation>
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
        />
      </NextBackNavigation>
    </>
  );
};

export default RegisterSecret;
