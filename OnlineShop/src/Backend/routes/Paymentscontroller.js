import express from 'express'
import Payments from '../models/Payments.js'
import Users from '../models/Users.js'
const routerpayments= express.Router()


routerpayments.post('/addpayment', async (req,res)=>{
    try {
        const {username,total,orderid}= req.body

        if(!total || !orderid || !username){
            return res.status(400).json({
                message: 'data required'
            })
        }
        const existuser = await Users.findOne({username})
    
        if(!existuser){
            return res.status(400).json({
                message: 'user not exist'
            })
        }
        const newpaymment = await Payments.create({username,orderid, total})
        res.status(200).json({
            orderid: newpaymment.orderid,
            total: newpaymment.total,
            message : '!Payment registered correctly!'
        })
    } catch (error) {
        return res.status(500).json({
            message : error
        })
    }
})
routerpayments.get('/getallpayments', async(req,res)=>{
    
    try {
        const listpayments= await Payments.find({})
        res.status(200).json(listpayments.map(item=>{
            return{
                username: item.username,
                oderid: item.orderid,
                message : '¡listed all payments succesfully!'
            }
        }))
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
})

export default routerpayments