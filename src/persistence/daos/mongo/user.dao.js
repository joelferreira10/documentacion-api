import { UserModel } from "./model/user.model.js";
import { hashPassword,isValidPassword } from "../../../utils.js";
import MongoDao from "./mongo.dao.js";



export default class UserDaoMongo extends MongoDao{
   constructor(){
      super(UserModel);
   }
    async register(user){
     try {
        const {email}=user;
        const userExist=await UserModel.findOne({email:email})
        if(!userExist){
            const newUser=await UserModel.create({...user,password:hashPassword(user.password)})
            return newUser;
        }else return false;
     } catch (error) {
        console.log(error);
     }       

    }
    async login(user){
     try {
        const {email,password}=user
        const userExist=await this.getByEmail(email)
        if(userExist){
         const validPass=isValidPassword(userExist,password);
         if(!validPass) return false
         else return userExist
      } else return false;
     } catch (error) {
        console.log(error);
     }   
    }
    async getByEmail(email){
      try {
         const emailUser=UserModel.findOne({email})
         if(!emailUser)return false;
         else return emailUser
      } catch (error) {
         console.log(error);
      }
    }
    async getCartUser(id){
      try {
         const userCart=await UserModel.findById(id).populate('cart.products.productId')
         if(!userCart)return false
         else return userCart
      } catch (error) {
         console.log(error)
      }
    }
    async addproductToUser(userId,prodId,quantity){
      try {
         const user=await UserModel.findById(userId)
   
         let productInCart = user.cart.products.findIndex(prod=>prod.productId.equals(prodId));
         
         if(!user )return false
         else{
               if(productInCart>-1){
                  user.cart.products[productInCart].quantity+=quantity
               }else{
               user.cart.products.push({
               productId:prodId,
               quantity
            })}
            }
           
         await user.save()
         return user
      }
         
       catch (error) {
        console.log(error) 
      }
    }
}