import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    title: { type: String, required: true,index:true},
    description: { type: String },
    code:{type:String, required:true,index:true},
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category:{type:String, required:true,index:true},
    thumbnails:[{type:String,default:[] }]
    // const {title,description,code,price,stock,category,thumbnails}=req.body
})


export const ProductModel=mongoose.model('products',productSchema)