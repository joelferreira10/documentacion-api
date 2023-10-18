
import Controllers from "./class.controller.js";
import { createResponse } from "../utils.js";
import UserService from "../services/user.service.js";
import { transporter } from "../nodemailer/email.service.js";
import 'dotenv/config'
const service=new UserService()

export default class UserController extends Controllers{
    constructor(){
        super(service)
    }

    async register(req,res){
        try {
            console.log("register controler")
            console.log(req.body)
            const newUser=await service.register(req.body)
            if(!newUser){createResponse(res,404,{method:"services", error:"User already exists"})}
            else {
              
                const option={
                    from:process.env.USER,
                    to:req.body.email,
                    subject:'Su mail ah sido verificado',
                    html:`<h1 style="color:red">Te damos la binvenida a CoderHouse ${req.body.first_name}</h1>`
                }
                
                const response=await transporter.sendMail(option)
                console.log(response)
                createResponse(res,200,newUser)
            }
        } catch (error) {
            console.log("error al enviar correo",error)
            createResponse(res,500,{error:"Internal error"})
        }
    }
    async login(req,res){
        try {
            console.log("entre al controller");
           const token=await service.login(req.body)
           console.log("token",token);
           res.header('Authorization',token)
           createResponse(res,200,token)
        } catch (error) {
            
        }
    }
    async current(req,res){
        try {
            const{id}=req.user
            console.log(id)
            const user=await service.getByIdDTO(id)
            if(user)return createResponse(res,200,user)
            return createResponse(res, 404 , "No existe el usuario con ese id")
        } catch (error) {
            console.log(error);
        }
    }
    async addproductToUser(req,res){
        try {
            const {quantity}=req.params;
            const {pid}=req.params;
            const {_id}=req.user
            console.log(`desde controller userid:${_id}  idProduc:${pid}  quenatity:${quantity}`)
            const newProductToUser=await service.addProducToUser(_id,pid,parseInt(quantity))
            console.log(newProductToUser)
            if (!newProductToUser)return createResponse(res,404,{msg:"Producto o usuario no existe"})
            else return createResponse(res,200,newProductToUser)
            
        } catch (error) {
            console.log(error)
        }
    }


}







