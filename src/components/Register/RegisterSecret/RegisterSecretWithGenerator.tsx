import JSEncrypt from "jsencrypt";
import { FC, useEffect, useState } from "react";
import { DownloadIcon } from "../../../assets/svg-icons";
import { exportFile } from "../../../modules/file";
import Button from "../../Generic/Button";
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

  useEffect(() => {
    if (publicKeyText && privateKeyText) return;
    const jseTest = new JSEncrypt({ default_key_size: "1024" });
    setPrivateKeyText(jseTest.getPrivateKey());
    setPublicKeyText(jseTest.getPublicKey());
    setIsKeypairReady(true);
  }, [privateKeyText, publicKeyText, setPrivateKeyText, setPublicKeyText]);

  return (
    <>
      {isKeypairReady ? (
        <div className="download-generated-keys">
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
        </div>
      ) : (
        <>Подождите</>
      )}
    </>
  );
};

export default RegisterSecretWithGenerator;
