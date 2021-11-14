export const checkUsernameValidity = (username: string) => {
  return /^[a-z0-9][a-z0-9_]{3,30}[a-z0-9]$/i.test(username);
};

export const checkPrivateKeyValidity = (privateKey: string) => {
  return /^-----BEGIN RSA PRIVATE KEY-----(.|\n|\r)+-----END RSA PRIVATE KEY-----$/.test(
    privateKey
  );
};
