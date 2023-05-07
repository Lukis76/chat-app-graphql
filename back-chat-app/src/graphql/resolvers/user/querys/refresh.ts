import { GraphQLContext, TypeError } from "../../../../utils/types";
import { decodeToken } from "../../../../utils/decodeToken";

export const refresh = async (
  _: any,
  args: {token: string | null},
  context: GraphQLContext
): Promise<{ timeOut: boolean } | TypeError> => {
  //=============================================
  const { token } = args;
  //=========================
  try {
    //-----------------------------------------------------------
    // authorized Token
    console.log("por aca no es aci >>>><<<<<")
    if(!token) return
    console.log("despues del if")
    const { exp } = await decodeToken(token);
    console.log("🚀 ~ file: refresh.ts:18 ~ exp:", exp)

    const expiredToken = exp ? Number(new Date(exp * 1000).getTime()) : 0;
    const timeDate = Number(new Date());
    //----------------------------------------------------------
    console.log("🚀 ~ file: refresh.ts:23 ~ expiredToken < timeDate:", expiredToken < timeDate)
    if (expiredToken < timeDate) {
      return {
        
        timeOut: false,
      };
    } else {

      return {
        timeOut: true,
      };
    }
    //-----------------
  } catch (err) {
    return err.message
  }
};
