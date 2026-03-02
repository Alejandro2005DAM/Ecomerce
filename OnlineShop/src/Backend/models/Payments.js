import { number } from "framer-motion";
import mongoose from "mongoose";


const paymentschema= mongoose.Schema({

    orderid:{
        type: Number
    },
    total: {
        type: Number
    }
})