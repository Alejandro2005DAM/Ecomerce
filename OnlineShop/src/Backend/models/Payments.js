import mongoose from "mongoose";


const paymentschema= new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    orderid:{
        type: String,
        required: true,
        unique: true
    },
    total: {
        type: mongoose.Schema.Types.Double,
        required: true
    }
},{
    timestamps: true
})

const Payments= mongoose.model('payments', paymentschema)
export default Payments