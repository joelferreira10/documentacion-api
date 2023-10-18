import passport from 'passport'
import {ExtractJwt,Strategy as jwtStrategy}from 'passport-jwt'
import dotenv from 'dotenv';
import UserDao from '../persistence/daos/mongo/user.dao.js'
dotenv.config();
const userDao=new UserDao();
const strategyOption={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.PRIVATE_KEY
}
const verifyToken=async(jwt_payload,done)=>{
    //console.log("payload jwt",jwt_payload);
    const user=await userDao.getById(jwt_payload.userID)

    if(!user)return done(null,false)
    done(null,user)
}

passport.use('jwt',new jwtStrategy(strategyOption,verifyToken))

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser(async(id,done)=>{
    const user=await userDao.getById(id)
    done(null,user)
})


