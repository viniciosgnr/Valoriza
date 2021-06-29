import {Router} from "express";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { CreateComplimentCOntroller } from "./controller/CreateComplimentController";
import { CreateTagController } from "./controller/CreateTagController";
import { CreateUserController } from "./controller/CreateUserController";
import { ListTagsController } from "./controller/ListTagsController";
import { ListUserReceiveComplimentsController } from "./controller/ListUserReceiveComplimentsController";
import { ListUsersController } from "./controller/ListUsersController";
import { ListUserSendComplimentsController } from "./controller/ListUserSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentCOntroller();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();  
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();


router.post(
  "/tags", 
  ensureAuthenticated, 
  ensureAdmin, 
  createTagController.handle
  );

router.get("/tags", ensureAuthenticated, listTagsController.handle);


router.post("/users", createUserController.handle);

router.post("/login", authenticateUserController.handle);

router.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
  );

router.get(
"/users/compliments/send", 
ensureAuthenticated, 
listUserSendComplimentsController.handle);


router.get(
"/users/compliments/receive",
ensureAuthenticated ,
listUserReceiveComplimentsController.handle);

router.get("/users", ensureAuthenticated ,listUsersController.handle);


export{router};