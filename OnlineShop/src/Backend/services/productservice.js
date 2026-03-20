import axios from "axios"

export const productservice = {

    onadd: async (username, product) => {
        try {
            const res = await axios.post('http://localhost:3000/api/auth/addproduct', {
                username: username,
                nombre: product.nombre,
                descripcion: product.descripcion,
                precio: product.precio,
                cant: 1
            })
            alert('producto agregado al carrito')
        } catch (error) {
            console.log(error.response.data)
        }
    },
    ondelete: async (username, product) => {
        try {
            {
                const res = await axios.delete('http://localhost:3000/api/auth/removeproducts', {
                    data: {
                        username: username,
                        nombre: product.nombre
                    }

                })
                alert('producto eliminado de la base de datos')
            }
        } catch (error) {
            console.log(error.response.data)
        }
    },
    onincrement: async (username, product) => {
        try {
            const res = axios.post('http://localhost:3000/api/auth/incrementcant', {
                username: username,
                nombre: product.nombre,
                descripcion: product.descripcion,
                cant: 1
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }, 
    ondecrement : async()=>{

        try {
             const res = axios.delete('http://localhost:3000/api/auth/decrementcant', {

                data: {
                    username: username,
                    nombre: product.nombre,
                }
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }

}