import ProductResDTO from "../../dtos/product/product.res.dto.js";
import factory from "../../daos/factory.js";

const {productDao}=factory
export default class ProductRepository{
    constructor(){
        this.dao=productDao
    }
    async getByIdDTO(id){
        try {
            const response=await this.dao.getById(id)
            if(!response)return false
            return new ProductResDTO(response)
        } catch (error) {
            console.log(error)
        }
    }
}