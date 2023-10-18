import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import passport from "passport";
import { authenticateUser } from "../middlewares/authenticateUser.js";
const userController=new UserController()
const router=Router();

router
    .get('/',userController.getAll.bind(userController))
    .post('/register',userController.register)
    .post('/login',userController.login)
    .get('/current',passport.authenticate('jwt'),userController.current)
    .post('/add/:pid/quantity/:quantity',passport.authenticate('jwt'),authenticateUser,userController.addproductToUser)
    //.get('/productCart',passport.authenticate('jwt'),userController.getCartUser)
export default router;