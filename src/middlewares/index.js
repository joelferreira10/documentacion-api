import { authenticateAdmin } from "./authenticateAdmin.js";
import { authenticateUser} from './authenticateUser.js'
export const aplyMiddlewares=(app)=>{
    app.use(authenticateAdmin)
    app.use(authenticateUser)
}