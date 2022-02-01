import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../Generic/Button";
import { NextNavigation } from "../Generic/NextBackNavigation";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";

interface RegisterStartProps {
  goToNextPanel: () => void;
}

const RegisterStart: FC<RegisterStartProps> = ({ goToNextPanel }) => {
  return (
    <>
      <Title size="largest">Регистрация</Title>
      <TextBlock size="large">
        Для создания аккаунта EncDiary вам потребуется придумать юзернейм и
        предоставить RSA ключи. Вы можете использовать свои ключи или позволить
        EncDiary создать их для вас
      </TextBlock>
      <NextNavigation>
        <Button size="large" onClick={goToNextPanel}>
          Начать
        </Button>
      </NextNavigation>
      <hr />
      <TextBlock size="small">
        Уже есть аккаунт? <Link to="/login">Логин</Link>
      </TextBlock>
    </>
  );
};

export default RegisterStart;
