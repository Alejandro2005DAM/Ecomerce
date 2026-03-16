import mongoose from "mongoose";



const productschema = new mongoose.Schema({

    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },

    cant: {
        type: Number,

    }

},
    { timestamps: true })



const Products = mongoose.model('products', productschema)

export default Products