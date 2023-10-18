import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
import ProductRepository from "../persistence/repository/product/product.repository.js";

const prodRepository=new ProductRepository()
const {productDao}=factory
export default class ProductService extends Services{
    constructor() {
        super(productDao)
    }
    
    async getByIdDTO(id){
        try {
            const prod=await prodRepository.getByIdDTO(id)
            if(!prod)return false
            return prod
        } catch (error) {
            console.log(error)
        }
    }
}