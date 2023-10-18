import {dirname} from 'path'
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'
import MongoStore  from 'connect-mongo'
import { connectionString } from './config/connection.js'

/* ------------------------------ ruta absoluta ----------------------------- */
export const __dirname=dirname(fileURLToPath(import.meta.url))

/* ------------------ encriptacion y validacion de password ----------------- */
export const hashPassword=(password)=>bcrypt.hashSync(password,bcrypt.genSaltSync(10))
export const isValidPassword=(user,password)=>bcrypt.compareSync(password,user.password)

/* ------------------- creacion de un modelo de respuesta ------------------- */
export const createResponse=(res,statusCode,data)=>{
    return res.status(statusCode).json({data})
}
/* ------------------------- generador alfanumerico ------------------------- */
export const generateAlphanumericCode=(length = 10)=> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
/* ------------------ configuracion para la sessionStorage ------------------ */
export const mongoOption={
    store:MongoStore.create({
        mongoUrl:connectionString,
        // crypto:{
        //     secret:'1234'
        // }
    }),
        secret:'1234',
    resave:false,
    saveUninitialized:false,
    cookie:{
    maxAge:60000
}
}