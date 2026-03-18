import express from 'express'
import Payments from '../models/Payments.js'
import Users from '../models/Users.js'
import Products from '../models/Products.js'
// gestiona los pagos   
const routerpayments = express.Router()


routerpayments.post('/addpayment', async (req, res) => {
    try {
        const { username, total, orderid } = req.body

        if (!total || !orderid || !username) {
            return res.status(400).json({
                message: 'data required'
            })
        }
        const existuser = await Users.findOne({ username }).populate('products')
        //obtener los productos del carrito del usuario
        const listproducts = existuser.products.map(p => {
            return {
                name: p.nombre,
                price: p.precio,
                cant: p.cant
            }
        })
        if (!existuser) {
            return res.status(400).json({
                message: 'user not exist'
            })
        }
        const existpayment = await Payments.findOne({ orderid })

        if (existpayment) {
            return res.status(400).json({
                message: 'this order already exist'
            })
        }
        const newpaymment = await Payments.create({ username, orderid, total, products: listproducts })
        //borrar los productos del carrito del usuario
        await Users.findOneAndUpdate({ username: username }, {
            $set: { products: [] }
        })
        //borrar los productos de la coleccion products de la base de datos
        const productsID = existuser.products.map(p => p._id)
        await Products.deleteMany({ _id: productsID })
        res.status(200).json({
            orderid: newpaymment.orderid,
            total: newpaymment.total,
            products: newpaymment.products,
            message: '!Payment registered correctly!'
        })

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
})
routerpayments.get('/getallpayments', async (req, res) => {

    try {
        const listpayments = await Payments.find({})
        res.status(200).json(listpayments.map(item => {
            return {
                username: item.username,
                oderid: item.orderid,
                message: '¡listed all payments succesfully!'
            }
        }))
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
})


routerpayments.get('/getallpayments/:username', async (req, res) => {
    try {
        const { username } = req.params

        const listpayments = await Payments.find({ username: username }).populate('products')
        return res.status(200).json(listpayments.map(item => {
            return {
                usrname: item.username,
                total: item.total,
                orderid: item.orderid,
                products: item.products.map(item => {
                    return {
                        name: item.nombre,
                        price: item.precio,
                        cant: item.cant
                    }
                }),
                message: 'all of payments listed succesfully'

            }
        }))

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }

})
export default routerpayments