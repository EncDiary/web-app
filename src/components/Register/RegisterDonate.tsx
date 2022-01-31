import { FC, useState } from "react";
import Button from "../Generic/Button";
import DonateCrypto from "../Generic/DonateCrypto";
import { NextBackNavigation } from "../Generic/NextBackNavigation";
import RadioInputGroup from "../Generic/Input/RadioInputGroup";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import { cryptoTypes } from "../../types/donateCrypto";
import { cryptoDonate as cryptoDonateList } from "../../data/cryptoDonate";

interface RegisterDonateProps {
  goToPrevPanel: () => void;
  submitHandler: () => void;
}

const RegisterDonate: FC<RegisterDonateProps> = ({
  goToPrevPanel,
  submitHandler,
}) => {
  const [currentSelection, setCurrentSelection] = useState<cryptoTypes>("btc");

  const currentItem = cryptoDonateList.find(
    (item) => item.id === currentSelection
  );

  return (
    <>
      <Title size="largest">Донат</Title>
      <TextBlock size="large">
        EncDiary абсолютно свободный проект и развивается только благодаря
        поддержке со стороны пользователей. Помочь проекту можно отправив
        средства на эти адреса
      </TextBlock>

      <RadioInputGroup
        name="donate"
        items={cryptoDonateList}
        currentSelection={currentSelection}
        setCurrentSelection={(selection: cryptoTypes) =>
          setCurrentSelection(selection)
        }
      />
      {currentItem && (
        <DonateCrypto
          address={currentItem.address}
          qrLocation={currentItem.qr}
        />
      )}

      <NextBackNavigation>
        <Button colorTheme="secondary" size="large" onClick={goToPrevPanel}>
          Назад
        </Button>
        <Button size="large" onClick={submitHandler}>
          Создать
        </Button>
      </NextBackNavigation>
    </>
  );
};

export default RegisterDonate;
