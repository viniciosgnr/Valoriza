import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositiries } from "../repositories/UsersRepositories";


export async function ensureAdmin(request:Request, response:Response, next:NextFunction){
const {user_id} = request;


const userRepositories = getCustomRepository(UsersRepositiries);
const {admin} = await userRepositories.findOne(user_id);

//verificar se usuário admin
if(admin){
  return next(); 
}

return response.status(401).json({
  error:"Unauthorized",
});
//
  
}