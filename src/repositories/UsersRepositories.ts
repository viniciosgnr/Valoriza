import {EntityRepository, Repository} from "typeorm";
import {User} from "../entities/User";

@EntityRepository(User)
class UsersRepositiries extends Repository<User>{

}

export {UsersRepositiries};