import { Dispatch, FC, SetStateAction, useState } from "react";
import { registerPanelEnum } from "../../types/register";
import Button from "../Generic/Button";
import DonateCrypto from "../Generic/DonateCrypto";
import { NextBackNavigation } from "../Generic/NextBackNavigation";
import RadioInputGroup from "../Generic/Input/RadioInputGroup";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import { cryptoTypes } from "../../types/donateCrypto";
import { cryptoDonate as cryptoDonateList } from "../../data/cryptoDonate";

interface RegisterDonateProps {
  setPanel: Dispatch<SetStateAction<registerPanelEnum>>;
  submitHandler: () => void;
}

const RegisterDonate: FC<RegisterDonateProps> = ({
  setPanel,
  submitHandler,
}) => {
  const [currentSelection, setCurrentSelection] =
    useState<cryptoTypes>(undefined);

  const currentItem = cryptoDonateList.find(
    (item) => item.id === currentSelection
  );

  return (
    <>
      <Title text="Donate" size="largest" />
      <TextBlock size="largest">Плати сколько хочешь</TextBlock>
      <TextBlock size="large">
        WebDiary абсолютно свободный проект и развивается только благодаря
        донатам. Вы можете не платить, если вы не хотите
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
        <Button
          text="Back"
          colorTheme="secondary"
          size="large"
          onClick={() => setPanel(registerPanelEnum.secret)}
        />
        <Button text="Create" size="large" onClick={submitHandler} />
      </NextBackNavigation>
    </>
  );
};

export default RegisterDonate;
