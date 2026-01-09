import axios from "axios"
import { useNavigate } from "react-router-dom"
import styles from'./Myaccount.module.css'
import { Authcontext } from "../../Context/Authcontext"
import { useContext, useState } from "react"
function Myaccount(){
const{email}= useContext(Authcontext)
const[message,setmessage]= useState('')
const deletecount= async()=>{

    try {
         const response = await axios.delete('http://localhost:3000/api/auth/delete',{
        data: {
            email: email
        }
    }) 
    setmessage('cuenta eliminada')

    alert(message)
    
    navigate('/login')
    } catch (error) {
        console.log(error)
    }
    


}

const navigate = useNavigate()

    return(
        <>
      
        <div className={styles.bg}>
              <h1>Mi cuenta {email}</h1>
            <div className={styles.container}>
                {/* <input type="text" />
                <input type="text" /> */}
                <button onClick={()=>navigate('/changepwd')}>Cambiar Contraseña</button>
                <button onClick={deletecount}>Eliminar Cuenta</button>
            </div>
            <div className={styles.back}>
                <button  onClick={()=>navigate('/shop')}>Volver</button>
            </div>
        </div>
        </>
    )
}





export default Myaccount