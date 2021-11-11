import { FC } from "react";
import { useHistory } from "react-router";
import { useFormState } from "../../hooks/useFormState";
import { getDotSeparatedDate } from "../../modules/datetime";
import {
  exportDecryptedBackup,
  exportEncryptedBackup,
} from "../../modules/file";
import Button from "../Generic/Button";
import { TextInput } from "../Generic/Input";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import SettingSection from "./SettingSection";
import "./SettingSecure.scss";
import { getBackupRequest } from "../../modules/request";
import store from "../../store";

const SettingSecure: FC = () => {
  return (
    <>
      <Title text="Безопасность" align="left" />
      <SettingDownloadBackup />
      <SettingChangePassword />
      <SettingDeleteAccount />
    </>
  );
};

const SettingDownloadBackup: FC = () => {
  const history = useHistory();
  const account = store.appStore.account;

  const exportBackup = async (backupType: "encrypted" | "decrypted") => {
    if (!account) {
      history.push("/login");
      return;
    }

    const serverResponse = await getBackupRequest(account.token);
    if (!serverResponse) return;
    const currentDate = getDotSeparatedDate(new Date());

    switch (backupType) {
      case "encrypted":
        exportEncryptedBackup(serverResponse.data, currentDate);
        break;
      case "decrypted":
        exportDecryptedBackup(
          serverResponse.data,
          currentDate,
          account.passphrase
        );
        break;
    }
  };

  return (
    <SettingSection>
      <Title text="Экспорт записей" size="medium" align="left" />
      <TextBlock>
        Подготовка бэкапа может занять некоторое время. Оставайтесь на этой
        странице до окончания процесса
      </TextBlock>
      <div className="backup-export">
        <Button
          text="Зашифрованный бэкап"
          onClick={() => exportBackup("encrypted")}
        />
        <Button
          text="Бэкап в чистом виде (не рекомендуется!)"
          colorTheme="secondary"
          onClick={() => exportBackup("decrypted")}
        />
      </div>
    </SettingSection>
  );
};

const SettingChangePassword: FC = () => {
  const [formValues, changeHandler] = useFormState({
    old_password: "",
    new_password: "",
    repeat_new_password: "",
  });

  return (
    <SettingSection>
      <Title text="Изменение пароля" size="medium" align="left" />
      <TextBlock>
        Во избежание потерь перед изменением пароля сохраните бэкап всех записей
      </TextBlock>
      <div className="change-password">
        <TextInput
          name="old_password"
          type="password"
          value={formValues.old_password}
          placeholder="Старый пароль"
          onChange={changeHandler}
        />
        <TextInput
          name="new_password"
          type="password"
          value={formValues.new_password}
          placeholder="Новый пароль"
          onChange={changeHandler}
        />
        <TextInput
          name="repeat_new_password"
          type="password"
          value={formValues.repeat_new_password}
          placeholder="Повторите новый пароль"
          onChange={changeHandler}
        />
        <Button text="Сменить пароль" />
      </div>
    </SettingSection>
  );
};

const SettingDeleteAccount: FC = () => {
  return (
    <SettingSection>
      <Title text="Удаление аккаунта" size="medium" align="left" />
      <TextBlock>
        Удаление учетной записи происходит безвозвратно. В дальнейшем логин
        [username] может быть переиспользован кем угодно. Перед удалением
        появится окно с подтвеждением действия
      </TextBlock>
      <Button text="Подтвердить удаление" />
    </SettingSection>
  );
};

export default SettingSecure;
