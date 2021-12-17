import { FC, useState } from "react";
import { CopyIcon } from "../../assets/svg-icons";
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
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="donate-crypto">
      <img src={qrLocation} alt="Bitcoin" className="donate-crypto__qr" />
      <div className="donate-crypto__address">
        {address}
        <span
          className={`donate-crypto__address-copy ${
            isCopied ? "donate-crypto__address-copy_copied" : ""
          }`}
          onClick={copyAddress}
        >
          <CopyIcon />
        </span>
      </div>
    </div>
  );
};

export default DonateCrypto;
