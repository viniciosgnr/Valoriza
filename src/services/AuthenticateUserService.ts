import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositiries } from "../repositories/UsersRepositories";

interface IAunthenticateRequest{
  email : string;
  password : string;
}

class AuthenticateUserService{

  async execute({email,password}:IAunthenticateRequest) {


    const  usersRepositories = getCustomRepository(UsersRepositiries); 
    
    //verificar se email exite
    const user = await usersRepositories.findOne({
      email
    });

    if(!user){
      throw new Error("Email/Password incorrect")
    }

    //verificar se senha está correta
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error("Email/Password incorrect")
    }
    //Gerar Token
    const token = sign({
      email : user.email  
    },
    "4f93ac9d10cb751b8c9c646bc9dbccb9",
    {
      subject : user.id,
      expiresIn : "1d"
    });

    return token;
    
  }
}

export{AuthenticateUserService};