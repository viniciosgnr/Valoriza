import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { UsersRepositiries } from "../repositories/UsersRepositories"



class ListUsersService{
  async execute(){
    const usersRepositories = getCustomRepository(UsersRepositiries);
    
    const users = await usersRepositories.find();

    return classToPlain(users);

  }
}

export{ListUsersService};