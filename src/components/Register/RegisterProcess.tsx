import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "../../hooks/useFormState";
import { registerPanelEnum } from "../../types/register";
import RegisterBullet from "./RegisterBullet";
import RegisterDonate from "./RegisterDonate";
import RegisterSecret from "./RegisterSecret";
import RegisterUsername from "./RegisterUsername";
import { errorAlert, successAlert } from "../../modules/sweetalert";
import { useHistory } from "react-router";
import { registerRequest } from "../../modules/request/userRequest";
import JSEncrypt from "jsencrypt";
import { useFileInputState } from "../../hooks/useFileInputState";
import {
  checkPrivateKeyValidity,
  checkUsernameValidity,
} from "../../modules/validator";
import { generateRandomBytes } from "../../modules/crypto";
import CryptoJS from "crypto-js";

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
            isValid={isUsernameValid}
          />
        );
      case registerPanelEnum.secret:
        return (
          <RegisterSecret
            setCurrentRegisterPanel={setCurrentRegisterPanel}
            isValidate={isPrivateKeyValid}
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

  const [currentPanelNumber, setCurrentPanelNumber] = useState(1);

  const submitHandler = async () => {
    if (!(isUsernameValid && isPrivateKeyValid)) return;

    if (fileText.length > 500) {
      errorAlert(
        "Слишком большой размер ключа",
        "EncDiary не поддерживает размер ключа больше, чем 2048 бит. Ограничение связано с повышенной нагрузкой на сервер"
      );
      return;
    }

    const jse = new JSEncrypt();
    jse.setPrivateKey(fileText);

    const passphraseSalt = CryptoJS.enc.Base64.stringify(
      generateRandomBytes(256)
    );

    const serverResponse = await registerRequest(
      formValues.username.toLowerCase(),
      jse.getPublicKey(),
      passphraseSalt
    );

    if (!serverResponse) return;
    successAlert("Пользователь успешно зарегистрирован");
    history.push("/login");
  };

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPrivateKeyValid, setIsPrivateKeyValid] = useState(false);

  useEffect(() => {
    const isFormValid = {
      username: checkUsernameValidity(formValues.username),
      privateKey: checkPrivateKeyValidity(fileText),
    };

    setIsUsernameValid(isFormValid.username);
    setIsPrivateKeyValid(isFormValid.privateKey);

    if (!isFormValid.username) {
      setCurrentPanelNumber(1);
    } else if (!isFormValid.privateKey) {
      setCurrentPanelNumber(2);
    } else {
      setCurrentPanelNumber(3);
    }
  }, [formValues, fileText]);

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
