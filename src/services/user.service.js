import Services from "./class.services.js";
import UserRepository from "../persistence/repository/user/user.repository.js";
import { generateToken } from "../jwt/auth.js";
import factory from "../persistence/daos/factory.js";
import dotenv from 'dotenv'
dotenv.config()
const userRepository= new UserRepository()
const {userDao,productDao}=factory

export default class UserService extends Services{
    constructor(){
        super(userDao);
    }

    async register(user){
        try {
            console.log("register service")
            return await userDao.register(user)
        } catch (error) {
            console.log(error);
        }
    }
    async login(user){
        try {
            const userExist=await userDao.login(user)
            if(userExist)return generateToken(userExist)
            else return false
        } catch (error) {
            console.log(error);
        }
    }
    async addProducToUser(userId,prodId,quantity){
        try {
            console.log("pase service")
            console.log(`desde service userid:${userId}  idProduc:${prodId}  quenatity:${quantity}`)
            const prod=await productDao.getById(prodId)
            // console.log("prod service",prod)
            if (!prod)return false
           
            else{
               const response= await userDao.addproductToUser(userId,prodId,quantity)
               console.log("response desde service",response)
               return response
            } 
        } catch (error) {
            console.log(error)
        }

    }
    async getByIdDTO(id){
        try {
            const response=await userRepository.getByIdDTO(id)
            if(!response)return false
            return response
        } catch (error) {
            console.log(error)
        }
    }
   

}