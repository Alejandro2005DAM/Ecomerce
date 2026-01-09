import { PayPalButtons } from "@paypal/react-paypal-js"
import styles from './Paypalbutton.module.css'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext } from "react"
import { Cartcontext } from "../../Context/Cartcontext"
function Paypalbutton({totalpay}){
const navigate= useNavigate()
const {cartitems} = useContext(Cartcontext)
    return(
        <div className={styles.container} style={{display: cartitems.length===0 ? 'none' : 'flex'}}>
        <PayPalButtons className={styles.paypalbtn} style={{height: 50, shape: 'rect', label: 'checkout'}}
        createOrder={(data,actions)=>{
            return actions.order.create(
                {
                    purchase_units : [
                        {
                            description: 'Payment for the products',
                            amount : {
                                value : totalpay,
                                
                             
                            }
                        }
                    ]
                }
            )
        }}
        onApprove={async(data,actions)=>{
            const id= data.orderID
            const order = await actions.order.capture()
            if(order.purchase_units[0].amount.value==='0'){
                navigate('/shop')
            }
            fetch('http://localhost:3000/api/auth/payment',{
                method: 'POST',
                body: JSON.stringify({
                    orderID: id
                })
            }).then((response)=>{
                if(!response.ok){
                    throw new Error('Error')
                }
                return response.json()
            })

            // try {
            //     const response = axios.post('http://localhost:3000/api/auth/payment',{
            //     orderID: id
            //     })        
            // } catch (error) {
            //     console.log(error)
            // }
        
        }}>
        </PayPalButtons>
        </div> 
    
)

}

export default Paypalbutton