import { PayPalButtons } from "@paypal/react-paypal-js"
import styles from './Paypalbutton.module.css'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext } from "react"
import { Cartcontext } from "../../Context/Cartcontext"
import { Authcontext } from "../../Context/Authcontext"
function Paypalbutton({ totalpay }) {
    const navigate = useNavigate()
    const { username } = useContext(Authcontext)
    const { cartitems } = useContext(Cartcontext)
    return (
        <div className={styles.container} style={{ display: cartitems.length === 0 ? 'none' : 'flex' }}>
            <PayPalButtons className={styles.paypalbtn} style={{ height: 50, shape: 'rect', label: 'checkout' }}
                createOrder={(data, actions) => {
                    return actions.order.create(
                        {
                            purchase_units: [
                                {
                                    description: 'Payment for the products',
                                    amount: {
                                        value: totalpay,


                                    }
                                }
                            ]
                        }
                    )
                }}
                onApprove={async (data, actions) => {
                    const id = data.orderID
                    const order = await actions.order.capture()
                    if (order.purchase_units[0].amount.value === '0') {
                        navigate('/shop')
                    }
                    fetch('http://localhost:3000/api/auth/addpayment', {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'POST',
                        body: JSON.stringify({
                            orderid: id,
                            username: username,
                            total: totalpay
                        })
                    }).then((response) => {
                        if (!response.ok) {
                            throw new Error('Error')
                            alert('Error')
                        }
                        alert('payment has been made')
                        return response.json()
                    })

                    // try {
                    //     const response = axios.post('http://localhost:3000/api/auth/payment',{
                    //     orderID: id
                    //     })        
                    // } catch (error) {
                    //     console.log(error)
                    // }

                }}
                onCancel={async (data) => {
                    navigate('/shop')
                    fetch('http://localhost:3000/api/auth/clearcart', {
                        headers: { 'Content-Type': 'application/json' },
                        method: 'DELETE',
                        body: JSON.stringify({
                            username: username,
                        })
                    })
                    alert('payment has been cancelled')
                }}>
            </PayPalButtons>
        </div>

    )

}

export default Paypalbutton