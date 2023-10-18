export default class Services{
    constructor(dao){
        this.dao=dao;
    }
    async getAll() {
        try {
          const response = await this.dao.getAll()
          return response;
        } catch (error) {
          console.log(error);
        }
      }
    
      async getById(id) {
        try {
          const response = await this.dao.getById(id);
          if(!response)return false
          else return response;
        } catch (error) {
          console.log(error);
        }
      }
    
      async create(obj) {
        try {
          const response = await this.dao.create(obj);
          if(!response)return false
          else return response;
        } catch (error) {
          console.log(error);
        }
      }
    
      async update(id, obj) {
        try {
         const response=await this.dao.getById(id)
         if (!response)return false
         else return await this.dao.update(id, obj);;
        } catch (error) {
          console.log(error);
        }
      }
    
      async delete(id) {
        
        try {
          console.log("id services",id)
          const response=await this.dao.getById(id)
          if (!response)return false
          else {
            await this.dao.delete(id);
            return response
             }
        } catch (error) {
          console.log(error);
        }
      }
}