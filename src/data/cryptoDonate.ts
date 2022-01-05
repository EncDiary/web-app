import bitcoinQr from "../assets/images/donate/bitcoin.png";
import ethereumQr from "../assets/images/donate/ethereum.png";
import binanceCoinQr from "../assets/images/donate/binance-coin.png";
import moneroQr from "../assets/images/donate/monero.png";

export const cryptoDonate = [
  {
    id: "btc",
    title: "Bitcoin",
    address: "bc1q5zk5m3tfgw5gt84jy344n6ddx25ywz3t8s4jt6",
    qr: bitcoinQr,
  },
  {
    id: "eth",
    title: "Ethereum",
    address: "0xe19B7704BDB65Ca1e11149f1728A740e9FE4b092",
    qr: ethereumQr,
  },
  {
    id: "bnb",
    title: "BNB",
    address: "bnb15kkevtkqnplmn4upsjwyrgwkpf3ksrxhpy68sw",
    qr: binanceCoinQr,
  },
  {
    id: "xmr",
    title: "Monero",
    address:
      "82bEmpVCrbeWgdAmYELWG3hRbx9Xby23YBJRVaiNsubvMuR9PJRUdngQnGpS68wARGRsqT2rHDZwCF1fBBDF6avdQiUR2f6",
    qr: moneroQr,
  },
];
