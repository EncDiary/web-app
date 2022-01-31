import JSEncrypt from "jsencrypt";
import { FC, useState } from "react";
import { DownloadIcon } from "../../../assets/svg-icons";
import { exportFile } from "../../../modules/file";
import Button from "../../Generic/Button";
import TextBlock from "../../Generic/TextBlock";
import "./RegisterSecretWithGenerator.scss";

interface RegisterSecretWithGeneratorProps {
  setPrivateKeyText: (text: string) => void;
  setPublicKeyText: (text: string) => void;
  publicKeyText: string;
  privateKeyText: string;
}

const RegisterSecretWithGenerator: FC<RegisterSecretWithGeneratorProps> = ({
  setPrivateKeyText,
  setPublicKeyText,
  publicKeyText,
  privateKeyText,
}) => {
  const [isKeypairReady, setIsKeypairReady] = useState(
    Boolean(publicKeyText && privateKeyText)
  );

  const generateKeypair = () => {
    if (publicKeyText && privateKeyText) return;
    const jseTest = new JSEncrypt({ default_key_size: "1024" });
    setPrivateKeyText(jseTest.getPrivateKey());
    setPublicKeyText(jseTest.getPublicKey());
    setIsKeypairReady(true);
  };

  return (
    <>
      <div className="download-generated-keys">
        {isKeypairReady ? (
          <>
            <Button
              size="large"
              className="download-generated-keys__button"
              onClick={() =>
                exportFile(privateKeyText, "encdiary.priv", "octet/stream")
              }
            >
              <DownloadIcon />
              Скачать Приватный Ключ
            </Button>
            <Button
              size="large"
              colorTheme="secondary"
              className="download-generated-keys__button"
              onClick={() =>
                exportFile(publicKeyText, "encdiary.pub", "octet/stream")
              }
            >
              <DownloadIcon />
              Скачать Публичный Ключ
            </Button>
          </>
        ) : (
          <Button size="large" onClick={generateKeypair}>
            Сгенерировать ключи
          </Button>
        )}
      </div>
      <TextBlock size="small">
        Обязательно сохраните ключи. Они потребуются для входа в систему.
      </TextBlock>
    </>
  );
};

export default RegisterSecretWithGenerator;
