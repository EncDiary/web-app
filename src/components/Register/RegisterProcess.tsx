import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useFormState } from "../../hooks/useFormState";
import { registerPanelEnum } from "../../types/register";
import RegisterBullet from "./RegisterBullet";
import RegisterDonate from "./RegisterDonate";
import RegisterSecret from "./RegisterSecret";
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

interface RegisterProcessProps {
  panel: registerPanelEnum;
  setPanel: Dispatch<SetStateAction<registerPanelEnum>>;
}

const RegisterProcess: FC<RegisterProcessProps> = ({ panel, setPanel }) => {
  const navigate = useNavigate();

  const switchRegisterPanel = (currentRegisterPanel: registerPanelEnum) => {
    switch (currentRegisterPanel) {
      case registerPanelEnum.username:
        return (
          <RegisterUsername
            setPanel={setPanel}
            username={formValues.username}
            setFormValues={setFormValues}
            isValid={checkIsUsernameValid()}
          />
        );
      case registerPanelEnum.secret:
        return (
          <RegisterSecret
            setPanel={setPanel}
            isValid={checkIsSecretValid()}
            setPrivateKeyText={setPrivateKeyText}
            privateKeyName={privateKeyName}
            setPrivateKeyName={setPrivateKeyName}
            setPublicKeyText={setPublicKeyText}
            publicKeyName={publicKeyName}
            setPublicKeyName={setPublicKeyName}
          />
        );
      case registerPanelEnum.terms:
        return (
          <RegisterTerms
            setPanel={setPanel}
            isValid={checkTermsAcceptance()}
            termsValues={termsValues}
            setTermsValues={setTermsValues}
          />
        );
      case registerPanelEnum.donate:
        return (
          <RegisterDonate setPanel={setPanel} submitHandler={submitHandler} />
        );
    }
  };

  const [formValues, setFormValues] = useFormState({
    username: "",
  });

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

  const [currentPanelNumber, setCurrentPanelNumber] = useState(1);

  const checkIsUsernameValid = useCallback(() => {
    return checkUsernameValidity(formValues.username);
  }, [formValues.username]);

  const checkIsSecretValid = useCallback(() => {
    return (
      checkPrivateKeyValidity(privateKeyText) &&
      checkPublicKeyValidity(publicKeyText)
    );
  }, [privateKeyText, publicKeyText]);

  const checkTermsAcceptance = useCallback(() => {
    return Object.values(termsValues).every((isChecked) => isChecked);
  }, [termsValues]);

  const submitHandler = async () => {
    if (
      !checkIsUsernameValid() ||
      !checkIsSecretValid() ||
      !checkTermsAcceptance()
    )
      return;

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
    if (!checkIsUsernameValid()) {
      setCurrentPanelNumber(1);
    } else if (!checkIsSecretValid()) {
      setCurrentPanelNumber(2);
    } else if (!checkTermsAcceptance()) {
      setCurrentPanelNumber(3);
    } else {
      setCurrentPanelNumber(4);
    }
  }, [
    formValues,
    privateKeyText,
    publicKeyText,
    checkTermsAcceptance,
    checkIsSecretValid,
    checkIsUsernameValid,
  ]);

  return (
    <>
      <RegisterBullet
        panels={[
          registerPanelEnum.username,
          registerPanelEnum.secret,
          registerPanelEnum.terms,
          registerPanelEnum.donate,
        ]}
        currentPanel={panel}
        setCurrentPanel={setPanel}
        currentPanelNumber={currentPanelNumber}
      />
      {switchRegisterPanel(panel)}
    </>
  );
};

export default RegisterProcess;
