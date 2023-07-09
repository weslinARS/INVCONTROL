import mongoose from 'mongoose'
import {MONGODB_URI} from './config.js'

export async function connectDB(){
  try{
    const db = await mongoose.connect(MONGODB_URI);
  }catch(error){
    console.log(error); 
  }
}
export async function disconnectDB(){
  try{
    await mongoose.disconnect();
  }catch(error){
    console.log(error);
  }
}