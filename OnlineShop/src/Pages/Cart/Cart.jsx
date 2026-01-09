import { useNavigate } from "react-router-dom"
import { Trash, Plus, Minus } from "lucide-react"
import Navbar from "../Shop/Navbar"
import { Cartcontext } from "../../Context/Cartcontext"
import { useContext } from "react"
import { PayPalButtons } from "@paypal/react-paypal-js"
import styles from './Cart.module.css'
import Paypalbutton from "./Paypalbutton"
function Cart(){
// const navigate= useNavigate()
const {remove,cartitems,total,incrementcant,decrementcant}= useContext(Cartcontext)
const quitproduct=(p,index)=>{
    remove(p,index)
}
    return(

        <div className={styles.bgshop}>
        
            <Navbar/>
                
                    <h1>Products listed</h1>
                    {/* <button onClick={()=>navigate('/shop')}>Back to shop</button> */}
                    <div className={styles.products}>
                    {
                        cartitems.map((item,index)=>(
                            
                            <div className={styles.product}>
                                <small>{item.cant}</small>
                                <p>{item.nombre}</p>
                                <img src={item.imagen} alt="" srcset="" />
                                <div className={styles.btnrow}>
                                    <button onClick={()=>incrementcant(item)}>+</button>
                                    <button onClick={()=>decrementcant(item)}>-</button>
                                </div>
                                <button onClick={()=>quitproduct(item,index+1)}><Trash /></button>
                            </div>
                            
                        ))
                    }
                    </div>

                <h1>Total to pay : {total.toFixed(2)} €</h1>
                <Paypalbutton totalpay={total} />
                
        </div>
    )
}


export default Cart