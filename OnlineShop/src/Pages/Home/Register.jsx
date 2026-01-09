import { useState } from "react";
import styles  from'./Register.module.css'
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection,addDoc } from "firebase/firestore";
import { auth,db } from "../../Backend/Auth";
import axios from "axios";
function Register(){
const [email, setemail]= useState('')
const [password, setpassword]= useState('')
const [repeatpwd, setrepeatpwd]=useState('')
const [nombre,setnombre]= useState('')
const [message, setmessage]= useState('')

const inactive= !email || ! password || !nombre || !repeatpwd
const navigate= useNavigate()

const register= async()=>{


    // try {
    //     const userdata= createUserWithEmailAndPassword(auth,email,password)
    //     const user=  (await (userdata)).user

    //     await addDoc(collection(db,'Tienda'),{
    //         name: nombre,
    //         direction: email,
    //         date: new Date(),
    //         id: user.uid
    //     })
    //     alert('Cuenta creada')
    // } catch (error) {
    //    console.error("Error completo de Firebase:", error); 
    // console.error("Código de error:", error.code);
    // }


    try {
        const response= await axios.post('http://localhost:3000/api/auth/register',{
            username: nombre,
            email: email,
            password: password
        })
       
        if(!password===repeatpwd){
                setemail('')
                setnombre('')
                setpassword('')
                setrepeatpwd('')
                setmessage('passwords doesn´t match')
            }
        
        navigate('/login')
    } catch (error) {

        setmessage('Error')
       
        console.log(error)
    }

}
    
    return(
        <div className={styles['register-page']}>
            <div className={styles['register-container']}>
                <h1 className={styles.title}>Registrarse</h1>
                <div className={styles.inputs}>
                    <input type="text"  placeholder="name" value={nombre} onChange={(e)=>setnombre(e.target.value)}/>
                <input type="text" placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)}  />
                <input type="password" placeholder="repeat password" value={repeatpwd} onChange={(e)=>setrepeatpwd(e.target.value)} />
                </div>
                <div className={styles.buttonscontainer}>
                     <button onClick={()=>navigate('/login')}>Volver</button> 
                     <button onClick={register}  disabled={inactive} > Crear </button>
                </div>
            </div>
           
        </div>
    )
}

export default Register