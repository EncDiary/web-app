import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { generateId, getHashText, textToHex } from "../../functions/crypto";
import { useFormState } from "../../hooks/useFormState";
import { registerPanelEnum } from "../../types/register";
import RegisterBullet from "./RegisterBullet";
import RegisterDonate from "./RegisterDonate";
import RegisterSecret from "./RegisterSecret";
import RegisterUsername from "./RegisterUsername";
import axios, { AxiosError } from "axios";
import qs from "qs";
import { errorPopup, successPopup } from "../Generic/Popup";
import { useHistory } from "react-router";

interface RegisterProcessProps {
  currentRegisterPanel: registerPanelEnum;
  setCurrentRegisterPanel: Dispatch<SetStateAction<registerPanelEnum>>;
}

const RegisterProcess: FC<RegisterProcessProps> = ({
  currentRegisterPanel,
  setCurrentRegisterPanel,
}) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const history = useHistory();

  const switchRegisterPanel = (currentRegisterPanel: registerPanelEnum) => {
    switch (currentRegisterPanel) {
      case registerPanelEnum.username:
        return (
          <RegisterUsername
            setCurrentRegisterPanel={setCurrentRegisterPanel}
            username={formValues.username}
            setFormValues={setFormValues}
            isValidate={valueValidators.username}
          />
        );
      case registerPanelEnum.secret:
        return (
          <RegisterSecret
            setCurrentRegisterPanel={setCurrentRegisterPanel}
            formValues={formValues}
            setFormValues={setFormValues}
            isValidate={valueValidators.password}
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
    password: "",
  });

  const valueValidators = {
    username: /^[a-z][a-z0-9_]{4,31}$/i.test(formValues.username),
    password: formValues.password.length > 0,
  };

  const [currentPanelNumber, setCurrentPanelNumber] = useState(1);

  const submitHandler = async () => {
    const passwordHexText = textToHex(formValues.password);
    const saltHexText = generateId(64);

    const saltyPasswordHashText = getHashText(passwordHexText + saltHexText);

    const data = await axios({
      method: "post",
      url: serverUrl + "register",
      data: qs.stringify({
        username: formValues.username,
        key: saltyPasswordHashText,
        encryption_type: "aes",
        password_salt: saltHexText,
      }),
    }).catch((error: AxiosError) => {
      const errorText = error.response?.data.message ?? "Неизвестная ошибка";
      errorPopup(errorText);
    });

    if (data === undefined) return;
    successPopup("Пользователь успешно зарегистрирован");
    history.push("/login");
  };

  useEffect(() => {
    if (!valueValidators.username) {
      setCurrentPanelNumber(1);
    } else if (!valueValidators.password) {
      setCurrentPanelNumber(2);
    } else {
      setCurrentPanelNumber(3);
    }
  }, [formValues, valueValidators.username, valueValidators.password]);

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
