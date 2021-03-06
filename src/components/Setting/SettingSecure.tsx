import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { getDotSeparatedDate } from "../../modules/datetime";
import {
  exportDecryptedBackup,
  exportEncryptedBackup,
} from "../../modules/file";
import Button from "../Generic/Button";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import SettingSection from "./SettingSection";
import "./SettingSecure.scss";
import {
  deleteAccountRequest,
  getBackupRequest,
} from "../../modules/request/userRequest";
import { successAlert, writeTextAlert } from "../../modules/sweetalert";
import { IAccount } from "../../types/account";
import { spinnerCreator } from "../Generic/Spinner";
import { clearStore } from "../../modules/clearStore";

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
      <Title align="left">Безопасность</Title>
      <SettingDownloadBackup account={account} />
      <SettingDeleteAccount account={account} />
    </>
  );
};

const SettingDownloadBackup: FC<SettingDownloadBackupProps> = ({ account }) => {
  const exportBackup = (backupType: "encrypted" | "decrypted") =>
    spinnerCreator(async () => {
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
    });

  return (
    <SettingSection>
      <Title size="medium" align="left">
        Экспорт записей
      </Title>
      <TextBlock>
        Подготовка бэкапа может занять некоторое время. Оставайтесь на этой
        странице до окончания процесса
      </TextBlock>
      <div className="backup-export">
        <Button onClick={() => exportBackup("encrypted")}>
          Зашифрованный бэкап
        </Button>
        <Button
          colorTheme="secondary"
          onClick={() => exportBackup("decrypted")}
        >
          Бэкап без шифрования
        </Button>
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
      spinnerCreator(async () => {
        const serverDeleteAccountResponse = await deleteAccountRequest(account);

        if (!serverDeleteAccountResponse) return;

        successAlert("Дневник удален успешно");
        clearStore();
        navigate("/login");
      });
    }
  };

  return (
    <SettingSection>
      <Title size="medium" align="left">
        Удаление аккаунта
      </Title>
      <TextBlock>
        Осторожно! Удаление учетной записи - процесс необратимый. Будет удалена
        вся информация о вашем аккаунте и всех записях. В дальнейшем логин{" "}
        <b>{account.username}</b> может быть переиспользован кем угодно. (Перед
        удалением появится окно с подтверждением действия)
      </TextBlock>
      <Button onClick={() => deleteAccount()}>Подтвердить удаление</Button>
    </SettingSection>
  );
};

export default SettingSecure;
