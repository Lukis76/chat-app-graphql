import { GraphQLContext, TypeError, Inputs, User } from '../../../../utils/types'
import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
///////////////////////////////////////////////////////////////////
export const registerUser = async (
  _: any,
  { registerInput }: { registerInput: Inputs },
  context: GraphQLContext
): Promise<User | TypeError> => {
  //==================================================
  const { prisma } = context
  const { username, email, password } = registerInput
  console.log("🚀 ~ file: register.ts:14 ~ registerInput:", registerInput)
  //==================================================
  try {
    //-------------------------------------------------
    const usuario = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    //--------------------------------------------------------
    if (!!usuario) {
      throw new GraphQLError(
        `User is already registered with the email ==> ${email}`
      )
    }
    //----------------------------------------------------------
    const passHash: string = await bcrypt.hash(password, 10)
    //------------------------------------------------------------------
    if (!passHash) {
      throw new GraphQLError(
        'An unexpected error occurred while trying to hash the password'
      )
    }
    //------------------------------------------------------------------

    const newUser: User = await prisma.user.create({
      data: {
        username,
        email,
        token: '',
        passwordHash: passHash,
      },
    })
    //-------------------------------------------------------------------
    if (!newUser) {
      throw new GraphQLError(
        'An unexpected error occurred while creating the user in the db'
      )
    }
    //------------------------------------------------------------------
    const userToken = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      passHash: newUser.passwordHash,
    }
    //------------------------------------------------------------
    const token: string = jwt.sign(userToken, process.env.DECODE_TOKEN, {
      expiresIn: process.env.TIME_TOKEN,
    })
    //------------------------------------------------------------
    if (!token) {
      throw new GraphQLError(
        'An unexpected error occurred while creating the token'
      )
    }
    //------------------------------------------
    const update: User = await prisma.user.update({
      where: {
        id: newUser.id,
      },
      data: {
        token,
      },
    })
    //-------------------------------------------------------
    if (!update) {
      throw new GraphQLError(
        'An unexpected error occurred while update the token'
      )
    }
    //--------------------------------------------------------
    return {
      
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      image: newUser.image,
      email: newUser.email,
      token: token,
    }
    //-------------------------------------------
  } catch (err) {
    console.log('Register error', err)
    return {
      error: {
        name: err?.name,
        message: err?.message,
      },
    }
  }
}
/////////////////////////////////////////////////////////////////////////////
