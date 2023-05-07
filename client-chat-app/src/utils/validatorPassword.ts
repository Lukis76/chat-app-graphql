export const passwordValidator = (
  targetName: string,
  targetValue: string | undefined,
  err: (name: string, errv: string, err: string) => void
) => {
  if (targetName === "password" && targetValue !== undefined) {
    if (targetValue === "") {
      err(targetName, "el campo password no puede estar vacio", "err");
    } else if (/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g.test(targetValue)) {
      err(targetName, "success", "success");
    } else {
      err(
        targetName,
        'deve proporcionar un password valido "[A-z] [0-9] [!@#$%^&*()_+{}:"<>?]"',
        "err"
      );
    }
  }
};
