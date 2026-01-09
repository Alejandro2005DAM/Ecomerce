import { useState } from "react";
import styles from './Login.module.css'
import { Import, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Backend/Auth";
import { Authcontext } from "../../Context/Authcontext";
import { useContext } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
function Login(){

const {email, setemail,setauthenticated, password, setpassword}= useContext(Authcontext)
// const [authenticated, setauthenticated]= useState(false)
// const [password, setpassword]= useState('')
const [message, setmessage]=useState('')
const[showpassword ,setshowpassword]= useState(false)
const navigate= useNavigate()


const init= async()=>{

// try {
//     const userdata = await signInWithEmailAndPassword(auth,email,password) 

//     setauthenticated(true)
//     navigate('/shop')
// } catch (error) {
//     alert(error)
    
// }


try {
    const response =  await axios.post('http://localhost:3000/api/auth/login', {
        email : email,
        password : password
    })

    setmessage(response.data.message)
    setauthenticated(true)
    navigate('/shop')
} catch (error) {
    console.log(error)
    setmessage('error')
}

    


}

    return(
        <div className={styles.loginpage}>
            
            <div className={styles.container}>
                <User  className={styles.icon} color="rgba(255, 255, 255, 1)" size={270} />
                <h1 className={styles.title}>Iniciar Sesión</h1>
                <div className={styles.inputcontainer}>
                    <input type="text" placeholder="Email"  value={email} onChange={(e)=>setemail(e.target.value)} required/>
                    <input className={styles.pwd} type={!showpassword ? 'password' : 'text'} placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)} required />
                     <Eye className={styles.eye} color={!showpassword ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)'} size={25} onClick={()=>setshowpassword(!showpassword ? true : false)}/>
                </div>
                <div className={styles.buttonscontainer}>
                    <button className={styles.login} onClick={()=>init()}>Iniciar Sesión</button>
                    <button className={styles.login} onClick={()=>navigate('/register')}>Registrarse</button>
                    <button className={styles.login} onClick={()=>navigate('/shop')}>Acceder como invitado</button>
                </div>
                <p>{message}</p>
            </div>

        </div>    
    )
}

export default Login