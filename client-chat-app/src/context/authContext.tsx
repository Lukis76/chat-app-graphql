import { AuthContextTypes } from "@context/index";
import { createContext } from "react";
/////////////////////////////////////////////////////////////////
export const authUserContext = createContext<AuthContextTypes>({
  user: null,
  login: () => {},
  logOut: () => {},
});
