import { useState,useEffect, useContext,useRef, use } from "react"
import styles from './Shop.module.css'
import { HomeIcon, ShoppingCart,Trash,Heart} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import { Cartcontext } from "../../Context/Cartcontext"
import { Ontapscale } from "../../Animations/Animations"
import { color, motion } from "framer-motion"
import { Favoritecontext } from "../../Context/Favoritecontext"
// export const Bar=({onnavigate,changecart})=>{
//     return(
//       <nav className={styles.navlinks}>
//                     <button className={styles.home} onClick={()=>onnavigate('/login')}><HomeIcon style={{color: 'red'}}/></button>
//                     <h1 className={styles.title}>TechShop</h1>
//                     <div className={styles.elements}>
//                         <Link to='/shop'>Shop</Link>
//                         <Link to='/about'>About</Link>
//                         <Link to='/contact' >Contact</Link>
//                     </div>
//                     <ShoppingCart color="blue" size={40} onClick={()=>changecart(true)}/>
//                 </nav>
//     )
// }


function Shop (){
const{addquit,like}= useContext(Favoritecontext)
const {add,able}= useContext(Cartcontext)    
const [lista,setlista]= useState([])
const [text,setext]= useState('') 
const [cart,setcart]= useState(false)
const [option,setoption]=useState('precio')
// const [listedproducts,setlistedproducts]=useState([]) cart
const [filtered,setfiltered]=useState([])
const [priceorder, setpriceorder]=useState('Price ASC')
const [buttonbg,setbuttonbg]=useState({backgroundImage: 'radial-gradient(rgb(216, 41, 41),rgb(122, 24, 24))'})
// const [heartcolor,setheartcolor]= useState({color: 'red'})
useEffect(()=>{
    const cargar=()=>{
    fetch('data.json')
    .then((data)=>data.json())
    .then((products)=>setlista(products.productos))
    }

    cargar()
},[])


const optionrmanager=(opc)=>{
        setoption(opc)
switch(opc){

    case 'precio':
         changeorder()
         break
         
    case 'nombre':
        orderbyname()
        break
    case  'descripcion':
        orderbydescription()
        break   
    default: return
}

}

const marklike=(p)=>{
    
addquit(p)


}
const orderbydescription= ()=>{
    const ordered=[...lista].sort((a,b)=>{
        return a.descripcion.localeCompare(b.description)
    })
    setlista(ordered)
}


const orderbyname=()=>{

const neworder= [...lista].sort((a,b)=>{
    return a.nombre.localeCompare(b.nombre)
})

setlista(neworder)

}


const changeorder=()=>{
const neworder=priceorder==='Price ASC' ?  'Price DES' : 'Price ASC'

    const set= [...lista].sort((a,b)=>{
        return neworder==='Price ASC' ? a.precio - b.precio :  b.precio -a.precio
    })
    setbuttonbg({backgroundImage : buttonbg.backgroundImage==='radial-gradient(rgb(216, 41, 41),rgb(122, 24, 24))' ? 'radial-gradient(rgba(241, 117, 16, 1),rgba(153, 67, 67, 1))' : 'radial-gradient(rgb(216, 41, 41),rgb(122, 24, 24))'
    }) 
    setlista(set)
    setpriceorder(neworder)

}


const search=(value)=>{


const product= lista.filter((item)=>item.nombre.toLowerCase().includes(value.toLowerCase())) 

setfiltered(product)


}


const addproduct=(p,index)=>{

    // const buy= [...listedproducts,p]
    // setlistedproducts(buy)
    // alert('product added to cart')
    add(p,index)
    alert('product added to cart')
}

// const quit=(p)=>{
//     const remove= listedproducts.filter((item)=>item.id!=p.id)
//     setlistedproducts(remove)
// }

    return(
        <>{!cart &&
            <div className={styles.bgshop}>
                {/* <nav className={styles.navlinks}>
                    <button className={styles.home} onClick={()=>navigate('/login')}><HomeIcon style={{color: 'red'}}/></button>
                    <h1 className={styles.title}>TechShop</h1>
                    <div className={styles.elements}>
                        <li>Shop</li>
                        <li>About</li>
                        <li>Contact</li>
                    </div>
                    <ShoppingCart color="blue" size={40} onClick={()=>setcart(true)}/>
                </nav> */}
                {/* <Bar onnavigate={navigate} changecart={setcart} /> */}
                <Navbar  changecart={setcart}/>
                <div className={styles.settings}>
                    <input type="text" placeholder="search a product" value={text}  onChange={(e)=>setext(e.target.value)} onKeyUp={(e)=>search(e.target.value)} />
                    <button  style={buttonbg} onClick={changeorder}>{priceorder}</button>
                    <select  name="filtro" value={option} className={styles.filters}
                    onChange={(e)=>optionrmanager(e.target.value)}>
                        <option value="precio">Precio</option>
                        <option value="nombre">Nombre</option>
                        <option value="descripcion">Descripcion</option>

                    </select>
                </div>
                
                <div className={styles['container-products']}>
                    {
                   (text==='' ? lista: filtered).map((item,index)=>(
                            <motion.div  {...Ontapscale} className={styles.card}>
                                <p className={styles.name}>{item.nombre}</p>
                                <img src={item.imagen} alt="" />
                                <p className={styles.price}>{item.precio} €</p>
                                <p className={styles.description}>{item.descripcion}</p>
                                <button onClick={()=>addproduct(item,index+1)} disabled={able.includes(item.id)}>  {able.includes(item.id) ? 'Añadido' : 'Añadir'}</button>
                                <Heart onClick={()=>marklike(item)}  color={like.includes(item.id)? 'red': 'black'} className={styles.Heart} size={25}/>
                            </motion.div>
                        ))
                    }

                </div>

            </div>
            }
            {/* {
                cart &&
                <div>
                    <h1>Products listed</h1>
                    <button onClick={()=>setcart(false)}>Back to shop</button>
                
                    {
                        listedproducts.map((item)=>(
                            <>
                                <p>{item.nombre}</p>
                                <img src={item.imagen} alt="" srcset="" />
                                <button onClick={()=>quit(item)}><Trash/></button>
                            </>
                        ))
                    }
                </div>
            } */}
        </>            
    )
}

export default Shop