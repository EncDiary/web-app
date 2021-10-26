import { Dispatch, FC, SetStateAction } from "react";
import { registerPanelEnum } from "../../types/register";
import { PrimaryButton, SecondaryButton } from "../Generic/Button";
import { NextBackNavigation } from "../Generic/NextBackNavigation";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import RegisterBullet from "./RegisterBullet";

interface RegisterDonateProps {
  setCurrentRegisterPanel: Dispatch<SetStateAction<registerPanelEnum>>;
}

const RegisterDonate: FC<RegisterDonateProps> = ({
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
        currentPanelNum={3}
      />
      <Title text="Donate" />
      <TextBlock size="big">Плати сколько хочешь</TextBlock>
      <TextBlock>
        WebDiary абсолютно свободный проект и развивается только благодаря
        донатам. Вы можете не платить, если вы не хотите
      </TextBlock>
      <NextBackNavigation>
        <SecondaryButton
          text="Back"
          clickHandler={() => setCurrentRegisterPanel(registerPanelEnum.secret)}
        />
        <PrimaryButton text="Create" />
      </NextBackNavigation>
    </>
  );
};

export default RegisterDonate;
