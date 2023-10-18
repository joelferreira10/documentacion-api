import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import passport from "passport";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.js";
const productController= new ProductController()
const router =Router()

router
    .get('/',productController.getAll.bind(productController))
    .get('/:id',productController.getById.bind(productController))
    .get('/dto/:id',productController.getByIdDTO.bind(productController))
    .post('/',passport.authenticate('jwt'),authenticateAdmin,productController.create.bind(productController))
    .put('/:id',passport.authenticate('jwt'),authenticateAdmin,productController.update.bind(productController))
    .delete('/:id',passport.authenticate('jwt'),authenticateAdmin,productController.delete.bind(productController))



export default router