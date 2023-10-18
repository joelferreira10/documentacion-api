import factory from "../../daos/factory.js"
import UserResDTO from "../../dtos/user.res.dto.js"
const {userDao}=factory
export default class UserRepository{
    constructor(){
        this.dao=userDao
    }
    async getByIdDTO(id){
        try {
            const response=await this.dao.getCartUser(id)
            if(!response)return false
            return new UserResDTO(response)
        } catch (error) {
            console.log(error)
        }
    }
}