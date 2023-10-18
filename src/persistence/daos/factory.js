import ProductDaoMongo from "./mongo/product.dao.js";
import UserDaoMongo from "./mongo/user.dao.js";
import TicketDaoMongo from "./mongo/ticket.dao.js";
import ProductFS from "./filesystem/product.dao.js";
import { connectDB } from "../../config/connection.js";
import 'dotenv/config'


let userDao;
let productDao;
let ticketDao;
let persistence=process.env.PERSISTENCE

switch (persistence) {
    case "file":
        console.log("entro a persistencia FileSystem")
        userDao="";
        productDao=new ProductFS()
        break;
    case "mongo":
        console.log("entro a persistencia Mongo")
        await connectDB()
        userDao=new UserDaoMongo();
        productDao=new ProductDaoMongo()
        ticketDao=new TicketDaoMongo()
        break;
    default:
        userDao=new UserDaoMongo();
        productDao=new ProductDaoMongo()
        ticketDao=new TicketDaoMongo()
       
}
export default{
    userDao,
    productDao,
    ticketDao
}
