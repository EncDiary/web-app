import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "../../hooks/useFormState";
import { registerPanelEnum } from "../../types/register";
import RegisterBullet from "./RegisterBullet";
import RegisterDonate from "./RegisterDonate";
import RegisterSecret from "./RegisterSecret";
import RegisterUsername from "./RegisterUsername";
import { errorAlert, successAlert } from "../../modules/sweetalert";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../../modules/request/userRequest";
import JSEncrypt from "jsencrypt";
import { useFileInputState } from "../../hooks/useFileInputState";
import {
  checkPrivateKeyValidity,
  checkPublicKeyValidity,
  checkUsernameValidity,
} from "../../modules/validator";
import { spinnerCreator } from "../Generic/Spinner";

interface RegisterProcessProps {
  currentRegisterPanel: registerPanelEnum;
  setCurrentRegisterPanel: Dispatch<SetStateAction<registerPanelEnum>>;
}

const RegisterProcess: FC<RegisterProcessProps> = ({
  currentRegisterPanel,
  setCurrentRegisterPanel,
}) => {
  const navigate = useNavigate();

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
            isValid={isPrivateKeyValid && isPublicKeyValid}
            setPrivateKeyText={setPrivateKeyText}
            privateKeyName={privateKeyName}
            setPrivateKeyName={setPrivateKeyName}
            setPublicKeyText={setPublicKeyText}
            publicKeyName={publicKeyName}
            setPublicKeyName={setPublicKeyName}
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

  const [privateKeyText, privateKeyName, setPrivateKeyText, setPrivateKeyName] =
    useFileInputState();
  const [publicKeyText, publicKeyName, setPublicKeyText, setPublicKeyName] =
    useFileInputState();

  const [currentPanelNumber, setCurrentPanelNumber] = useState(1);

  const submitHandler = async () => {
    if (!(isUsernameValid && isPrivateKeyValid && isPublicKeyValid)) return;

    if (publicKeyText.length > 500) {
      errorAlert(
        "Слишком большой размер ключа",
        "EncDiary не поддерживает размер ключа больше, чем 2048 бит. Ограничение связано с повышенной нагрузкой на сервер"
      );
      return;
    }

    const jse = new JSEncrypt();
    jse.setPrivateKey(privateKeyText);

    const jsePublicKey = new JSEncrypt();
    jsePublicKey.setPublicKey(publicKeyText);

    if (jse.getPublicKeyB64() !== jsePublicKey.getPublicKeyB64()) {
      errorAlert(
        "Ошибка проверки пары ключей",
        "Проверьте ключи на соответствие"
      );
      return;
    }

    await spinnerCreator(async () => {
      const serverResponse = await registerRequest(
        formValues.username.toLowerCase(),
        jse.getPublicKey()
      );

      if (!serverResponse) return;
      successAlert("Пользователь успешно зарегистрирован");
      navigate("/login");
    });
  };

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPrivateKeyValid, setIsPrivateKeyValid] = useState(false);
  const [isPublicKeyValid, setIsPublicKeyValid] = useState(false);

  useEffect(() => {
    const isFormValid = {
      username: checkUsernameValidity(formValues.username),
      privateKey: checkPrivateKeyValidity(privateKeyText),
      publicKey: checkPublicKeyValidity(publicKeyText),
    };

    setIsUsernameValid(isFormValid.username);
    setIsPrivateKeyValid(isFormValid.privateKey);
    setIsPublicKeyValid(isFormValid.publicKey);

    if (!isFormValid.username) {
      setCurrentPanelNumber(1);
    } else if (!(isFormValid.privateKey && isFormValid.publicKey)) {
      setCurrentPanelNumber(2);
    } else {
      setCurrentPanelNumber(3);
    }
  }, [formValues, privateKeyText, publicKeyText]);

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
