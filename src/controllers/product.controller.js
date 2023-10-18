import Controllers from "./class.controller.js";
import ProductService from "../services/product.service.js";
import { createResponse } from "../utils.js";
// const produtService=new ProductService()
// const prodFS=new ProductFS()
const prodService=new ProductService()
export default class ProductController extends Controllers{
    constructor(){
        super(prodService);
    }
   
    async getByIdDTO(req,res){
        try {
            const { id } = req.params;
            console.log(id)
            const item = await prodService.getByIdDTO(id);
            if (!item)
            createResponse(res, 404, {
             method: "service",
             error: "Item not found",
            });
      else createResponse(res, 200, item);
        } catch (error) {
            console.log(error)
        }
    }

    
}