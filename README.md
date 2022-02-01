# EncDiary

EncDiary is a web application for keeping an encrypted diary. Symmetric (AES-256-CBC) and asymmetric (RSA) encryption types are used for encryption. The project is based on Lumen PHP server with ReactJS frontend.

This is frontend part of EncDiary. You can find the API [here](https://github.com/EncDiary/api)

## Screenshots

![Creating a Note](https://i.imgur.com/HNaKpAd.png)
![Today Notes](https://i.imgur.com/diZjLAC.png)
![Notes History](https://i.imgur.com/dmjvxWy.png)
![Login](https://i.imgur.com/NO8WwRL.png)
![Setting](https://i.imgur.com/NeQO5Zg.png)

## Dependencies

### Main

- Create React App
- React Router DOM
- Typescript
- MobX

### Components

- TipTap
- React Modal
- Sweetalert2

### Encryption

- CryptoJS
- JSEncryption
- JWT Decode

### Styles

- Node Sass
- Normalize.css

### Additional

- Axios
- HTML React Parser
- qs
- React Idle Timer

## Directory Structure

- [public](public/) - static files
- [.env](.env) - Configuration file
- [src](src/) - source files
  - [assets](src/assets/) - fonts, images, svg, styles (media & colors)
  - [components](src/components/) - Components of app. Next to each component there is a file with styles (.scss)
  - [data](src/data/) - Static data in json format
  - [hooks](src/hooks/) - custom ReactJS hooks
  - [modules](src/modules/) - general purpose functions
  - [store](src/store/) - MobX store
  - [types](src/types/) - TypeScript types

## Configuration

Example .env file:

```
REACT_APP_SERVER_URL = https://server.url/
REACT_APP_DEMO_USERNAME = demo
REACT_APP_DEMO_PRIVATE_KEY = -----BEGIN RSA PRIVATE KEY-----ThisIsYourRSAPrivateKey-----END RSA PRIVATE KEY-----
```

Replace value of `REACT_APP_SERVER_URL` with the url of your API server. Value of `REACT_APP_DEMO_PRIVATE_KEY` will be ready in the release. This value doesn't need to be changed. Demo notes in the database template will also be.

## Development

Run app for development using command:

```sh
npm start
```

After successfully starting the server, navigate to http://localhost:3000/.

## Build

Create production build of application using command:

```sh
npm run build
```

## Donate

If you wish to, you can buy me a cup of tea with cookies

- **BTC** - `bc1q5zk5m3tfgw5gt84jy344n6ddx25ywz3t8s4jt6`
- **ETH** - `0xe19B7704BDB65Ca1e11149f1728A740e9FE4b092`
- **BNB** - `bnb15kkevtkqnplmn4upsjwyrgwkpf3ksrxhpy68sw`
- **XMR** - `82bEmpVCrbeWgdAmYELWG3hRbx9Xby23YBJRVaiNsubvMuR9PJRUdngQnGpS68wARGRsqT2rHDZwCF1fBBDF6avdQiUR2f6`

## Additional

### Generating RSA keypair

These actions are performed within your terminal (Unix based OS):

- Generate and see private key by executing the following commands:

```sh
openssl genrsa -out encdiary_priv.pem 1024
cat encdiary_priv.pem
```

- Get public key by doing the following:

```
openssl rsa -pubout -in encdiary_priv.pem -out encdiary_pub.pem
cat encdiary_pub.pem
```