import { Router } from "express";
import TicketController from "../controllers/ticket.controller.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import passport from "passport";
const ticketController=new TicketController()
const router=Router()

    router.post('/purchase',passport.authenticate('jwt'),ticketController.generateTicket)
    router.get("/purchase",passport.authenticate("jwt"),authenticateUser,ticketController.getAll.bind(ticketController))
export default router
