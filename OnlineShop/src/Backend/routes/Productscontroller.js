import Products from "../models/Products.js";
import Users from "../models/Users.js";
import express from 'express'
import router from "./Userscontroller.js";
// gestiona los productos que hay en el carrito
const routerproducts = express.Router()
routerproducts.post('/addproduct', async (req, res) => {
    try {
        const { username, nombre, descripcion, precio, cant } = req.body


        if (!nombre || !descripcion || !cant) {
            return res.status(400).json({
                message: 'data required'
            })
        }
        // const existproduct = await Products.findOne({nombre})

        // let  p
        // if(existproduct){
        //         p = await Products.findOneAndUpdate({nombre: nombre},{
        //         $inc : {
        //             cant : cant
        //         }
        //     },{new :true})
        // } else{
        //     p= await Products.create({nombre,descripcion,cant})
        // }


        let existuser = await Users.findOne({ username }).populate('products')
        let product
        const hasproduct = existuser.products.some(item => item.nombre === nombre)
        if (!hasproduct) {
            product = await Products.create({ nombre, descripcion, precio, cant })
            existuser = await Users.findOneAndUpdate({ username: username },
                {
                    $push: {
                        products: product
                    }
                }, { new: true }
            )

        } else {
            product = await Products.findOneAndUpdate({ nombre: nombre },
                {
                    $inc: { cant: cant }
                },
                { new: true }
            )
        }



        res.status(201).json({
            username: existuser.username,
            products: existuser.products,
            message: `product added to the user${existuser.username} `
        })

    } catch (error) {

        return res.status(500).json({
            message: error
        })
    }
}


)


routerproducts.delete('/removeproducts', async (req, res) => {

    try {
        const { username, nombre } = req.body

        if (!username || !nombre) {
            return res.status(400).json({
                message: 'data required'
            })
        }
        let existuser = await Users.findOne({ username }).populate('products')

        let product

        const hasproduct = existuser.products.some(item => item.nombre === nombre)
        const productquantity = existuser.products.find(item => item.nombre === nombre)
        if (!hasproduct) {
            return res.status(400).json({
                message: 'You dont have this product'
            })
        } else {

            // if(productquantity.cant>0){
            // product = await Products.findOneAndUpdate({nombre: nombre},{
            //     $set : {cant : 0}
            // },{new: true})
            // } else{
            const productstoremove = existuser.products.find(item => item.nombre = nombre)
            existuser = await Users.findOneAndUpdate({ username: username }, {
                $pull: {
                    products: productstoremove._id
                }
            }, { new: true })
            // product = await Products.deleteOne({nombre})
            product = await Products.deleteOne({ nombre })
            // }
        }

        res.status(201).json({
            username: existuser.username,
            product: existuser.products,
            message: 'operation succesfull'
        })

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }

})

//para incrementar cantidad
routerproducts.post('/incrementcant', async (req, res) => {

    try {
        const { username, nombre, cant } = req.body

        if (!username || !nombre || !cant) {
            return res.status(400).json({
                message: 'data required'
            })
        }
        const priceproduct = await Products.findOne({ nombre })
        let existuser = await Users.findOne({ username }).populate('products')

        const hasproduct = existuser.products.some(item => item.nombre === nombre)
        let product
        if (hasproduct) {
            product = await Products.findOneAndUpdate({ nombre: nombre },
                {
                    $inc: { cant: cant, precio: priceproduct.precio }
                },


            )
        } else {
            return res.status(400).json({
                message: 'you don`t have this product'
            })
        }
        res.status(201).json({
            nombre: product.nombre,
            product: existuser.products,
            message: '!quantity incremented!'
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }


})

router.delete('/decrementcant', async (req, res) => {

    try {
        const { username, nombre } = req.body

        let existuser = await Users.findOne({ username }).populate('products')
        const hasproduct = existuser.products.some(item => item.nombre === nombre)
        const quantity = existuser.products.find(item => item.nombre === nombre)
        let product
        const priceproduct = await Products.findOne({ nombre })
        if (hasproduct) {

            if (quantity.cant > 1) {
                product = await Products.findOneAndUpdate({ nombre: nombre }, {
                    $inc: { cant: -1, precio: -priceproduct.precio }
                }, { new: true })
            } else {
                const remove = existuser.products.find(item => item.nombre === nombre)
                existuser = await Users.findOneAndUpdate({ username: username }, {
                    $pull: {
                        products: remove._id
                    }
                }, { new: true })
                product = await Products.findOneAndDelete({ nombre })

            }


        } else {
            return res.status(400).json({
                username: existuser.username,
                message: 'you don`t have this product'
            })
        }

        res.status(201).json({
            username: existuser.username,
            products: existuser.products,
            name: product.nombre,
            message: '!quantity decreased!'
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }

})


export default routerproducts