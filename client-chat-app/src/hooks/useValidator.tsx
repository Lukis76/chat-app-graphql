import { ChangeEvent, useState } from "react";
import { usernameValidator } from "@utils/validatorName";
import { emailValidator } from "@utils/validatorEmail";
import { passwordValidator } from "@utils/validatorPassword";
import { confirmPasswordValidator } from "@utils/validatorConfirmPassword";
//////////////////////////////////////////////////////////////////////////
type initialStateForm = {
  username?: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword?: string | undefined;
};
//--------------------------------------
const initialStateErr = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
//////////////////////////////////////////////////////////////////
export const useValidator = (initialState: initialStateForm) => {
  //=============================================================
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErr);
  const [errorValues, setErrorValues] = useState(initialState);
  //===========================================================
  const err = (name: string, errv: string, err: string) => {
    //-------------------------
    setErrorValues((prev) => ({
      ...prev,
      [name]: errv,
    }));
    //---------------------
    setErrors((prev) => ({
      ...prev,
      [name]: err,
    }));
  };
  //==========================================================
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    //---------------------------------
    usernameValidator(name, value, err);
    emailValidator(name, value, err);
    passwordValidator(name, value, err);
    confirmPasswordValidator(name, value, err, values.password);
    //----------------------------------------------------------
    setValues({ ...values, [name]: value });
  };
  //==================================================
  return { handleChange, errorValues, errors, values };
};
