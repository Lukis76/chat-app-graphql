import { authUserContext } from "@context/index";
import { useNavigate } from "react-router-dom";
import { FormEvent, useContext } from "react";
import { useValidator } from "./useValidator";
import { useMutation } from "@apollo/client";
import { operations } from "@GraphQL/index";
import { toast } from "react-hot-toast";
///////////////////////////////////////
type formType = "LOGIN" | "REGISTER";
//-----------------------------------
type initialStateForm = {
  username?: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword?: string | undefined;
};
////////////////////////////////////////////////////////////////////////////
export const useForm = (form: formType, initialState: initialStateForm) => {
  //------------------------------------------------------------------------
  const navigate = useNavigate();
  const { login } = useContext(authUserContext);
  const { handleChange, errorValues, errors, values } = useValidator(initialState);
  //===========================>>>>>> LOGIN <<<<<<===============================================//
  const [loginUser, { loading: LoginLoading }] = useMutation(operations.user.mutation.LOGIN_USER, {
    update: async (_, { data: { loginUser: userData } }) => {
      login(userData);
    },
    variables: { loginInput: values },
  });
  //=================>>>>>> REGISTER <<<<<<======================//
  const [registerUser, { loading: RegisterLoading }] = useMutation(
    operations.user.mutation.REGISTER_USER,
    {
      onCompleted: () => {
        navigate("/login");
      },
      variables: { registerInput: values },
    }
  );
  //---------------------------------------------------------
  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (form === "LOGIN") {
      const res = await loginUser();
      res.data.loginUser.token !== null
        ? navigate("/chat")
        : toast.error("este uruario no existe! \nrevisa tu email y password ");
    }
    if (form === "REGISTER") {
      await registerUser();
    }
  };
  //--------------
  return {
    handleChange,
    errors,
    errorValues,
    handleSubmit,
    values,
    loading: form === "LOGIN" ? LoginLoading : form === "REGISTER" ? RegisterLoading : null,
  };
};
