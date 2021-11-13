import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "../../hooks/useFormState";
import { registerPanelEnum } from "../../types/register";
import RegisterBullet from "./RegisterBullet";
import RegisterDonate from "./RegisterDonate";
import RegisterSecret from "./RegisterSecret";
import RegisterUsername from "./RegisterUsername";
import { successAlert } from "../../modules/sweetalert";
import { useHistory } from "react-router";
import { registerRequest } from "../../modules/request/userRequest";
import JSEncrypt from "jsencrypt";
import { useFileInputState } from "../../hooks/useFileInputState";

interface RegisterProcessProps {
  currentRegisterPanel: registerPanelEnum;
  setCurrentRegisterPanel: Dispatch<SetStateAction<registerPanelEnum>>;
}

const RegisterProcess: FC<RegisterProcessProps> = ({
  currentRegisterPanel,
  setCurrentRegisterPanel,
}) => {
  const history = useHistory();

  const switchRegisterPanel = (currentRegisterPanel: registerPanelEnum) => {
    switch (currentRegisterPanel) {
      case registerPanelEnum.username:
        return (
          <RegisterUsername
            setCurrentRegisterPanel={setCurrentRegisterPanel}
            username={formValues.username}
            setFormValues={setFormValues}
            isValid={valueValidators.username}
          />
        );
      case registerPanelEnum.secret:
        return (
          <RegisterSecret
            setCurrentRegisterPanel={setCurrentRegisterPanel}
            isValidate={valueValidators.privateKey}
            setFileText={setFileText}
            fileName={fileName}
            setFileName={setFileName}
          />
        );
      case registerPanelEnum.donate:
        return (
          <RegisterDonate
            setCurrentRegisterPanel={setCurrentRegisterPanel}
            submitHandler={submitHandler}
          />
        );
    }
  };

  const [formValues, setFormValues] = useFormState({
    username: "",
  });

  const [fileText, fileName, setFileText, setFileName] = useFileInputState();

  const valueValidators = {
    username: /^[a-z0-9][a-z0-9_]{3,30}[a-z0-9]$/i.test(formValues.username),
    privateKey: fileText.length > 0,
  };

  const [currentPanelNumber, setCurrentPanelNumber] = useState(1);

  const submitHandler = async () => {
    if (!(valueValidators.username && valueValidators.privateKey)) return;

    const jse = new JSEncrypt();
    jse.setPrivateKey(fileText);

    const serverResponse = await registerRequest(
      formValues.username.toLowerCase(),
      jse.getPublicKey()
    );

    if (!serverResponse) return;
    successAlert("Пользователь успешно зарегистрирован");
    history.push("/login");
  };

  useEffect(() => {
    if (!valueValidators.username) {
      setCurrentPanelNumber(1);
    } else if (!valueValidators.privateKey) {
      setCurrentPanelNumber(2);
    } else {
      setCurrentPanelNumber(3);
    }
  }, [formValues, valueValidators.username, valueValidators.privateKey]);

  return (
    <>
      <RegisterBullet
        panels={[
          registerPanelEnum.username,
          registerPanelEnum.secret,
          registerPanelEnum.donate,
        ]}
        currentPanel={currentRegisterPanel}
        setCurrentPanel={setCurrentRegisterPanel}
        currentPanelNumber={currentPanelNumber}
      />
      {switchRegisterPanel(currentRegisterPanel)}
    </>
  );
};

export default RegisterProcess;
