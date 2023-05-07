export const emailValidator = (
  targetName: string,
  targetValue: string | undefined,
  err: (name: string, errv: string, err: string) => void
) => {
  if (targetName === "email" && targetValue !== undefined) {
    if (targetValue === "") {
      err(targetName, "el campo email no puede estar vacio", "err");
    } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(targetValue)) {
      err(targetName, "success", "success");
    } else {
      err(targetName, "deve proporcionar un email valido", "err");
    }
  }
};
