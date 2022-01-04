import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useFormState } from "../../hooks/useFormState";
import { getDotSeparatedDate } from "../../modules/datetime";
import {
  exportDecryptedBackup,
  exportEncryptedBackup,
} from "../../modules/file";
import Button from "../Generic/Button";
import TextInput from "../Generic/Input/TextInput";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import SettingSection from "./SettingSection";
import "./SettingSecure.scss";
import {
  deleteAccountRequest,
  getBackupRequest,
} from "../../modules/request/userRequest";
import {
  errorAlert,
  successAlert,
  writeTextAlert,
} from "../../modules/sweetalert";
import { IAccount } from "../../types/account";

interface SettingSecureProps {
  account: IAccount;
}

interface SettingDownloadBackupProps {
  account: IAccount;
}

interface SettingDeleteAccountProps {
  account: IAccount;
}

const SettingSecure: FC<SettingSecureProps> = ({ account }) => {
  return (
    <>
      <Title text="Безопасность" align="left" />
      <SettingDownloadBackup account={account} />
      <SettingChangePassword />
      <SettingDeleteAccount account={account} />
    </>
  );
};

const SettingDownloadBackup: FC<SettingDownloadBackupProps> = ({ account }) => {
  const exportBackup = async (backupType: "encrypted" | "decrypted") => {
    const serverResponse = await getBackupRequest(account);
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

const SettingDeleteAccount: FC<SettingDeleteAccountProps> = ({ account }) => {
  const navigate = useNavigate();

  const deleteAccount = async () => {
    const result = await writeTextAlert(
      "Удаление аккаунта",
      `Вы абсолютно уверены? Это действие не может быть отменено. Это приведет к безвозвратному удалению дневника <b>${account.username}</b>.
      <br><br>Введите <b><u>Delete ${account.username}</u></b>`,
      (value: string) => {
        return value !== `Delete ${account.username}`
          ? "Аккаунт не может быть удален без подтверждения"
          : null;
      }
    );
    if (result.isConfirmed) {
      const serverDeleteAccountResponse = await deleteAccountRequest(account);

      if (!serverDeleteAccountResponse) {
        errorAlert("Ошибка при удалении дневника");
      }
      successAlert("Дневник удален успешно");
      navigate("/login");
    }
  };

  return (
    <SettingSection>
      <Title text="Удаление аккаунта" size="medium" align="left" />
      <TextBlock>
        Удаление учетной записи происходит безвозвратно. Будьте уверены в своих
        действиях. В дальнейшем логин <b>{account.username}</b> может быть
        переиспользован кем угодно. (Перед удалением появится окно с
        подтвеждением действия)
      </TextBlock>
      <Button text="Подтвердить удаление" onClick={() => deleteAccount()} />
    </SettingSection>
  );
};

export default SettingSecure;
