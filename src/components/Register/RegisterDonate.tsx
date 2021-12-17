import { Dispatch, FC, SetStateAction, useState } from "react";
import { registerPanelEnum } from "../../types/register";
import Button from "../Generic/Button";
import DonateCrypto from "../Generic/DonateCrypto";
import { NextBackNavigation } from "../Generic/NextBackNavigation";
import RadioInputGroup from "../Generic/RadioInputGroup";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import bitcoinQr from "../../assets/images/donate/bitcoin.png";
import ethereumQr from "../../assets/images/donate/ethereum.png";
import binanceCoinQr from "../../assets/images/donate/binance-coin.png";
import moneroQr from "../../assets/images/donate/monero.png";
import { cryptoTypes } from "../../types/donateCrypto";

interface RegisterDonateProps {
  setCurrentRegisterPanel: Dispatch<SetStateAction<registerPanelEnum>>;
  submitHandler: () => void;
}

const RegisterDonate: FC<RegisterDonateProps> = ({
  setCurrentRegisterPanel,
  submitHandler,
}) => {
  const cryptoDonateList = [
    {
      id: "btc",
      title: "Bitcoin",
      address: "bc1q5zk5m3tfgw5gt84jy344n6ddx25ywz3t8s4jt6",
      qr: bitcoinQr,
    },
    {
      id: "eth",
      title: "Ethereum",
      address: "0xe19B7704BDB65Ca1e11149f1728A740e9FE4b092",
      qr: ethereumQr,
    },
    {
      id: "bnb",
      title: "BNB",
      address: "bnb15kkevtkqnplmn4upsjwyrgwkpf3ksrxhpy68sw",
      qr: binanceCoinQr,
    },
    {
      id: "xmr",
      title: "Monero",
      address:
        "82bEmpVCrbeWgdAmYELWG3hRbx9Xby23YBJRVaiNsubvMuR9PJRUdngQnGpS68wARGRsqT2rHDZwCF1fBBDF6avdQiUR2f6",
      qr: moneroQr,
    },
  ];

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
          onClick={() => setCurrentRegisterPanel(registerPanelEnum.secret)}
        />
        <Button text="Create" size="large" onClick={submitHandler} />
      </NextBackNavigation>
    </>
  );
};

export default RegisterDonate;
