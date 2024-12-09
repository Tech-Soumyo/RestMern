export const generateVerifiactionCode = (length = 6): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let VerificationCode = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    VerificationCode += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  return VerificationCode;
};
