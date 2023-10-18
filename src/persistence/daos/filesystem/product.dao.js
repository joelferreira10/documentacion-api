import FSDao from "./fs.dao.js";
import { __dirname } from "../../../utils.js";
const path = __dirname+"/persistence/daos/filesystem/products.json";

export default class ProductFS extends FSDao{
    constructor(){
        super(path)
    }
}