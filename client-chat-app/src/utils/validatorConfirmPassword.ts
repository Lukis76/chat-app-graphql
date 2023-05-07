export const confirmPasswordValidator = (
  targetName: string,
  targetValue: string | undefined,
  err: (name: string, errv: string, err: string) => void,
  password: string | undefined
) => {
  if (targetName === "confirmPassword") {
    if (targetValue === "") {
      err(targetName, "el campo password no puede estar vacio", "err");
    }
    if (password !== undefined && password === targetValue && targetValue !== "") {
      err(targetName, "success", "success");
    } else {
      err(targetName, "el campo password y el campo confirm password deven coinsidir", "err");
    }
  }
};
