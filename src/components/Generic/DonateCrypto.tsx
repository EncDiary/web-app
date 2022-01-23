import { FC, useEffect, useState } from "react";
import "./DonateCrypto.scss";

interface DonateCryptoProps {
  address: string;
  qrLocation: string;
}

const DonateCrypto: FC<DonateCryptoProps> = ({ address, qrLocation }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setIsCopied(true);
  };

  useEffect(() => setIsCopied(false), [address, qrLocation]);

  return (
    <div className="donate-crypto">
      <img src={qrLocation} alt="Bitcoin" className="donate-crypto__qr" />
      <div
        className={`donate-crypto__address ${
          isCopied ? "donate-crypto__address_copied" : ""
        }`}
        onClick={copyAddress}
      >
        {address}
      </div>
    </div>
  );
};

export default DonateCrypto;
