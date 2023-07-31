import {Schema, Decimal128, model} from "mongoose";


const ProductSchema = new Schema({
  productName : {
    type : String,
    required : true,
    trim : true
  },
  productDescription: {
    type : String,
    require : true, 
  },
  productCategory : {
    type : String,
    required : true,
    trim : true
  },
  productStock : {
    type : Number, 
    required : true,
  },
  productPrice :{
    type: Number,
    required : true,
  },
  productSupplierId : {
    type : String,
    required : true,
  },
  productStockPolicy:{
    type : Number,
    required : true,
  },
  productIsOverPolicy:{
    type : Boolean,
    required : true,
  },
})

export default model("Product", ProductSchema);