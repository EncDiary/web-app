import { FC } from "react";
import Button from "../../Generic/Button";
import { NextBackNavigation } from "../../Generic/NextBackNavigation";
import Title from "../../Generic/Title";
import RegisterSecretWithGenerator from "./RegisterSecretWithGenerator";
import RegisterSecretWithoutGenerator from "./RegisterSecretWithoutGenerator";

interface RegisterSecretProps {
  useGenerator: boolean;
  goToNextPanel: () => void;
  goToPrevPanel: () => void;
  isValid: boolean;
  setPrivateKeyText: (text: string) => void;
  privateKeyName: string;
  setPrivateKeyName: (name: string) => void;
  setPublicKeyText: (text: string) => void;
  publicKeyName: string;
  setPublicKeyName: (name: string) => void;
  publicKeyText: string;
  privateKeyText: string;
}

const RegisterSecret: FC<RegisterSecretProps> = ({
  goToNextPanel,
  goToPrevPanel,
  isValid,
  setPrivateKeyText,
  privateKeyName,
  setPrivateKeyName,
  setPublicKeyText,
  publicKeyName,
  setPublicKeyName,
  useGenerator,
  publicKeyText,
  privateKeyText,
}) => {
  return (
    <>
      <Title text="Secret" size="largest" />
      {useGenerator ? (
        <RegisterSecretWithGenerator
          setPrivateKeyText={setPrivateKeyText}
          setPublicKeyText={setPublicKeyText}
          privateKeyText={privateKeyText}
          publicKeyText={publicKeyText}
        />
      ) : (
        <RegisterSecretWithoutGenerator
          setPrivateKeyText={setPrivateKeyText}
          privateKeyName={privateKeyName}
          setPrivateKeyName={setPrivateKeyName}
          setPublicKeyText={setPublicKeyText}
          publicKeyName={publicKeyName}
          setPublicKeyName={setPublicKeyName}
        />
      )}

      <NextBackNavigation>
        <Button colorTheme="secondary" size="large" onClick={goToPrevPanel}>
          Back
        </Button>
        <Button size="large" onClick={goToNextPanel} disabled={!isValid}>
          Next
        </Button>
      </NextBackNavigation>
    </>
  );
};

export default RegisterSecret;
