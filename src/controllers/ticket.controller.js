import TicketService from "../services/ticket.service.js";
import { createResponse } from "../utils.js";
import Controllers from "./class.controller.js";

const ticketService=new TicketService()
export default class TicketController extends Controllers{
    constructor(){
        super(ticketService)
    }
    async generateTicket(req,res){
        try {
            const {id}=req.user
            console.log("user desde controller",req.user);
            const ticket=await ticketService.generateTicket(id)
            if(!ticket)return createResponse(res,403,{msg:"Ticket not generate"})
            createResponse(res,200,{ticket:ticket,not_purchase:req.user.cart.products})
        } catch (error) {
            console.log(error)
        }
    }
}