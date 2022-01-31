import { FC } from "react";
import Button from "../Generic/Button";
import Checkbox from "../Generic/Input/Checkbox";
import { NextBackNavigation } from "../Generic/NextBackNavigation";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import "./RegisterTerms.scss";

interface RegisterTermsProps {
  goToNextPanel: () => void;
  goToPrevPanel: () => void;
  isValid: boolean;
  termsValues: {
    [key: string]: boolean;
  };
  setTermsValues: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterTerms: FC<RegisterTermsProps> = ({
  goToNextPanel,
  goToPrevPanel,
  isValid,
  termsValues,
  setTermsValues,
}) => {
  return (
    <>
      <Title size="largest">Условия использования</Title>
      <TextBlock>
        Сервис EncDiary предназначен для управления личным конфиденциальным
        дневником. Это веб-приложение, в котором пользователь может
        контролировать свои данные, используя симметричное и ассиметричное типы
        шифрования.
      </TextBlock>
      <TextBlock>
        Сам сервер EncDiary выступает лишь в роли удаленного хранилища данных.
        Весь процесс шифрования / дешифрования происходит исключительно в
        браузере устройства.
      </TextBlock>
      <TextBlock>
        EncDiary имеет полностью открытый исходный код. Любой может просмотреть
        его и развернуть на собственном сервере.
      </TextBlock>

      <div className="terms__checkboxes">
        <Checkbox
          checked={termsValues.term_save_keys}
          onChange={setTermsValues}
          name="term_save_keys"
        >
          Я сохранил мои приватный и публичный ключи.
        </Checkbox>

        <Checkbox
          checked={termsValues.term_give_key}
          onChange={setTermsValues}
          name="term_give_key"
        >
          Я понимаю, что я никому не должен передавать свой приватный ключ. А
          также понимаю: тот, кто владеет моим приватным ключом, владеет моей
          учетной записью EncDiary.
        </Checkbox>

        <Checkbox
          checked={termsValues.term_lose_key}
          onChange={setTermsValues}
          name="term_lose_key"
        >
          Я понимаю, что потеря моего приватного ключа означает потерю доступа к
          моей учетной записи. Единственное, что в этом случае может сделать
          разработчик - удалить мою учетную запись по требованию.
        </Checkbox>

        <Checkbox
          checked={termsValues.term_bugs}
          onChange={setTermsValues}
          name="term_bugs"
        >
          Я понимаю, что в коде этого приложения могут быть не обнаруженные
          проблемы.
        </Checkbox>

        <Checkbox
          checked={termsValues.term_responsibility}
          onChange={setTermsValues}
          name="term_responsibility"
        >
          Я понимаю, что только я один полностью несу ответственность за
          безопасность своих данных.
        </Checkbox>
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

export default RegisterTerms;
