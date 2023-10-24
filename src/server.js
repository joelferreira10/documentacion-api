import express, { json,urlencoded } from 'express';
import passport from 'passport'
import session from 'express-session';
import { mongoOption } from './utils.js';
import './config/connection.js';
import './passport/jwt.js'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import MainRouter from './routes/index.js';
import { aplyMiddlewares } from './middlewares/index.js';
import dotenv from 'dotenv'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express'
import { info } from './docs/info.js';
dotenv.config()

const app = express();
const specs= swaggerJSDoc(info)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
const mainRouter=new MainRouter()
const port=process.env.PORT || 8080

app
    //middlewares
    .use(json())
    .use(urlencoded({extended:true}))
    .use(morgan('dev'))
    //session
      .use(cookieParser())
      .use(session(mongoOption))

    //passport
    .use(passport.initialize())
    .use(passport.session())

    .use('/api',mainRouter.getRouter())
    .listen(port,()=>console.log(`server ok,port ${port}`))
    aplyMiddlewares(app)

