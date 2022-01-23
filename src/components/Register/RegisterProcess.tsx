import { FC, useEffect, useMemo, useState } from "react";
import { useFormState } from "../../hooks/useFormState";
import { registerPanelEnum } from "../../types/register";
import RegisterBullet from "./RegisterBullet";
import RegisterDonate from "./RegisterDonate";
import RegisterSecret from "./RegisterSecret/RegisterSecret";
import RegisterUsername from "./RegisterUsername";
import { errorAlert, successAlert } from "../../modules/sweetalert";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../../modules/request/userRequest";
import { useFileInputState } from "../../hooks/useFileInputState";
import {
  checkPrivateKeyValidity,
  checkPublicKeyValidity,
  checkUsernameValidity,
} from "../../modules/validator";
import { spinnerCreator } from "../Generic/Spinner";
import RegisterTerms from "./RegisterTerms";
import { useCheckboxesState } from "../../hooks/useCheckboxesState";
import { checkKeypair } from "../../modules/crypto";
import RegisterSecretAction from "./RegisterSecretAction";

const RegisterProcess: FC = () => {
  const navigate = useNavigate();

  const [panelNumber, setPanelNumber] = useState(0);

  const goToNextPanel = () => {
    setPanelNumber(panelNumber + 1);
  };

  const goToPrevPanel = () => {
    setPanelNumber(panelNumber - 1);
  };

  const panels = [
    registerPanelEnum.username,
    registerPanelEnum.secretAction,
    registerPanelEnum.secret,
    registerPanelEnum.terms,
    registerPanelEnum.donate,
  ];

  const switchPanel = (panelNumber: number) => {
    switch (panels[panelNumber]) {
      case registerPanelEnum.username:
        return (
          <RegisterUsername
            goToNextPanel={goToNextPanel}
            username={formValues.username}
            setFormValues={setFormValues}
            isValid={isUsernameValid}
          />
        );
      case registerPanelEnum.secretAction:
        return (
          <RegisterSecretAction
            goToNextPanel={goToNextPanel}
            goToPrevPanel={goToPrevPanel}
            isValid={isSecretActionValid}
            secretAction={secretAction}
            setSecretAction={setSecretAction}
            clearFiles={clearFiles}
          />
        );
      case registerPanelEnum.secret:
        return (
          <RegisterSecret
            goToNextPanel={goToNextPanel}
            goToPrevPanel={goToPrevPanel}
            isValid={isSecretValid}
            setPrivateKeyText={setPrivateKeyText}
            privateKeyName={privateKeyName}
            setPrivateKeyName={setPrivateKeyName}
            setPublicKeyText={setPublicKeyText}
            publicKeyName={publicKeyName}
            setPublicKeyName={setPublicKeyName}
            useGenerator={secretAction === "generate"}
            privateKeyText={privateKeyText}
            publicKeyText={publicKeyText}
          />
        );
      case registerPanelEnum.terms:
        return (
          <RegisterTerms
            goToNextPanel={goToNextPanel}
            goToPrevPanel={goToPrevPanel}
            isValid={isTermsAccepted}
            termsValues={termsValues}
            setTermsValues={setTermsValues}
          />
        );
      case registerPanelEnum.donate:
        return (
          <RegisterDonate
            goToPrevPanel={goToPrevPanel}
            submitHandler={submitHandler}
          />
        );
    }
  };

  const [formValues, setFormValues] = useFormState({
    username: "",
  });

  const [secretAction, setSecretAction] = useState<
    undefined | "generate" | "use-own-keys"
  >();

  const [termsValues, setTermsValues] = useCheckboxesState({
    term_save_keys: false,
    term_give_key: false,
    term_lose_key: false,
    term_bugs: false,
    term_responsibility: false,
  });

  const [privateKeyText, privateKeyName, setPrivateKeyText, setPrivateKeyName] =
    useFileInputState();
  const [publicKeyText, publicKeyName, setPublicKeyText, setPublicKeyName] =
    useFileInputState();

  const clearFiles = () => {
    setPrivateKeyText("");
    setPrivateKeyName("Выберите файл");
    setPublicKeyText("");
    setPublicKeyName("Выберите файл");
  };

  const [availablePanelNumber, setAvailablePanelNumber] = useState(0);

  const isUsernameValid = useMemo(() => {
    return checkUsernameValidity(formValues.username);
  }, [formValues.username]);

  const isSecretActionValid = useMemo(
    () => Boolean(secretAction),
    [secretAction]
  );

  const isSecretValid = useMemo(() => {
    return (
      checkPrivateKeyValidity(privateKeyText) &&
      checkPublicKeyValidity(publicKeyText)
    );
  }, [privateKeyText, publicKeyText]);

  const isTermsAccepted = useMemo(() => {
    return Object.values(termsValues).every((isChecked) => isChecked);
  }, [termsValues]);

  const submitHandler = async () => {
    if (!isUsernameValid || !isSecretValid || !isTermsAccepted) return;

    if (publicKeyText.length > 500) {
      errorAlert(
        "Слишком большой размер ключа",
        "EncDiary не поддерживает размер ключа больше, чем 2048 бит. Ограничение связано с повышенной нагрузкой на сервер"
      );
      return;
    }

    const checkingResult = checkKeypair(privateKeyText, publicKeyText);
    if (!checkingResult.status) {
      errorAlert(
        "Ошибка проверки пары ключей",
        "Проверьте ключи на соответствие"
      );
      return;
    }

    await spinnerCreator(async () => {
      const serverResponse = await registerRequest(
        formValues.username.toLowerCase(),
        checkingResult.jse.getPublicKey()
      );

      if (!serverResponse) return;
      successAlert("Пользователь успешно зарегистрирован");
      navigate("/login");
    });
  };

  useEffect(() => {
    if (!isUsernameValid) {
      setAvailablePanelNumber(0);
    } else if (!isSecretActionValid) {
      setAvailablePanelNumber(1);
    } else if (!isSecretValid) {
      setAvailablePanelNumber(2);
    } else if (!isTermsAccepted) {
      setAvailablePanelNumber(3);
    } else {
      setAvailablePanelNumber(4);
    }
  }, [isTermsAccepted, isSecretValid, isUsernameValid, isSecretActionValid]);

  return (
    <>
      <RegisterBullet
        panels={panels}
        currentPanelNumber={panelNumber}
        setPanelNumber={setPanelNumber}
        availablePanelNumber={availablePanelNumber}
      />
      {switchPanel(panelNumber)}
    </>
  );
};

export default RegisterProcess;
