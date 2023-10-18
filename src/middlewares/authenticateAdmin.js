import { createResponse } from "../utils.js"

export const authenticateAdmin=async(req,res,next)=>{
    
    const{role}=req.user
    if(role!=="admin")return createResponse(res,403,{msg:"Solo el administrador puede ejecutar estas tareas" })
    next()
    
}