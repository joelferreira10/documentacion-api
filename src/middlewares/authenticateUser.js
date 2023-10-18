import { createResponse } from "../utils.js"

export const authenticateUser=async(req,res,next)=>{
    const{role}=req.user

    if(role!=="user")return createResponse(res,403,{msg:"Solo el USUARIO puede ejecutar estas tareas" })
    next()
}