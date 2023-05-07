export const usernameValidator = (
  targetName: string,
  targetValue: string | undefined,
  err: (name: string, errv: string, err: string) => void
) => {
  if (targetName === "username" && targetValue !== undefined) {
    if (targetValue === "") {
      err(targetName, "el campo username no puede estar vacio", "err");
    } else if (targetValue?.length < 6) {
      err(targetName, "el campo username no puede tener menos de 5 caracteres de longitud", "err");
    } else if (targetValue?.length >= 20) {
      err(targetName, "el campo username no puede tener 20 caracteres o mas de longitud", "err");
    } else {
      err(targetName, "success", "success");
    }
  }
};
