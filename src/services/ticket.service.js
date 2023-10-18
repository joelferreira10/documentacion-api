import factory from "../persistence/daos/factory.js";
import Services from "./class.services.js";


const{userDao,productDao,ticketDao}=factory

export default class TicketService extends Services{
    constructor(){
        super(ticketDao)
    }
    async generateTicket(idUser){
        try {
            const user=await userDao.getById(idUser)
            if(!user)return false
            else{
                let complete=false;
                let pay=0;
                let amount=0
                const userCart=user.cart.products
                for (const prod in userCart) {
                    let prodId=userCart[prod].productId.toString()
                    let quantity=userCart[prod].quantity
                    const productsDB=await productDao.getById(prodId)
                    
                    if(quantity<=productsDB.stock){
                        user.cart.products.splice(prod,1)
                        amount=quantity*productsDB.price;
                        pay+=amount;
                        amount=0
                        productsDB.stock-=quantity
                        await productsDB.save()
                        complete=true
                    }

                }
                if(complete){
                const ticket=ticketDao.create({
                    amount:pay,
                    purchaser:user.email
                })
                await user.save()
                return ticket
            }
                else return false
            }
        } catch (error) {
            console.log(error)
        }
    }
}