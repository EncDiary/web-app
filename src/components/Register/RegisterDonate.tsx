import { Dispatch, FC, SetStateAction } from "react";
import { registerPanelEnum } from "../../types/register";
import Button from "../Generic/Button";
import { NextBackNavigation } from "../Generic/NextBackNavigation";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";

interface RegisterDonateProps {
  setCurrentRegisterPanel: Dispatch<SetStateAction<registerPanelEnum>>;
  submitHandler: () => void;
}

const RegisterDonate: FC<RegisterDonateProps> = ({
  setCurrentRegisterPanel,
  submitHandler,
}) => {
  return (
    <>
      <Title text="Donate" size="largest" />
      <TextBlock size="largest">Плати сколько хочешь</TextBlock>
      <TextBlock size="large">
        WebDiary абсолютно свободный проект и развивается только благодаря
        донатам. Вы можете не платить, если вы не хотите
      </TextBlock>
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
