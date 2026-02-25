import { tr } from "framer-motion/m";
import mongoose from "mongoose";



const productschema = new mongoose.Schema({

    nombre: {
        type : String
    }, 
    descripcion: {
        type : String
    } ,

    cant: {
        type: Number,
        min: 0, 
        default : 0
    }

},
{timestamps : true})



const Products = mongoose.model('products' , productschema)

export default Products