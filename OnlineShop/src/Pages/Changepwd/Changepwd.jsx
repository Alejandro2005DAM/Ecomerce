import axios from "axios";
import styles from './Changepwd.module.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../../Context/Authcontext";
function Changepwd(){
const {email} = useContext(Authcontext)
const [currentpwd, setcurrentpwd]= useState('')
const [newpwd,setnewpwd]= useState('')
const [username, setusername]= useState('')

const navigate= useNavigate()

useEffect(()=>{
    const cargarnombre= async()=>{
    try {
         const response =  await axios.get(`http://localhost:3000/api/auth/getusername/${email}`)
        setusername(response.data.username)        
    } catch (error) {
        console.log(error)
    }
     
    
    }
    
    cargarnombre()
},[email])
const changepassword=async()=>{

try {
    const response = await axios.put('http://localhost:3000/api/auth/newpassword',{
        
            email: email,
            currentpwd: currentpwd,
            newpwd: newpwd
        
    }
    )
    alert('Contraseña cambiada')
    navigate('/login')
} catch (error) {
    console.log(error)
}

}


    return(
    <div className={styles.bg}>
        <h1>Usuario : {username}</h1>
        <div className={styles.inputcontainer}>
            <input value={currentpwd} type="password" placeholder="Introduce la contraseña actual" onChange={(e)=>setcurrentpwd(e.target.value)} />
            <input value={newpwd} type="password" placeholder="Introduce la contraseña nueva" onChange={(e)=>setnewpwd(e.target.value)}/>
            <button onClick={changepassword}>Confirmar</button>
        </div>

        <div className={styles.btnback}>
            <button onClick={()=>navigate('/myaccount')}>Volver</button>

        </div>
    </div>
    )
}

export default Changepwd