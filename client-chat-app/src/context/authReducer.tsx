import { ActionTypes, InitialStateProps } from "@context/index";
////////////////////////////////////////////////////////////////////////////////
export const authReducer = (state: InitialStateProps, action: ActionTypes) => {
  switch (action.type) {
    //-------------------------
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    //-------------------------
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    //-------------
    default:
      return state;
    //-------------
  }
};
