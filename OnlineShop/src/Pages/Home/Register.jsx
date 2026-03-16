import { use, useState } from "react";
import styles from './Register.module.css'
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../Backend/Auth";
import axios from "axios";
import { authservice } from "../../Backend/services/authservice";
import { passwordmatch } from "../../Backend/services/authservice";
import { Eye } from "lucide-react";
function Register() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [repeatpwd, setrepeatpwd] = useState('')
    const [nombre, setnombre] = useState('')
    const [message, setmessage] = useState('')
    const [showpassword, setshowpassword] = useState(false)
    const [showconfirmpassword, setshowconfirmpassword] = useState(false)

    const inactive = !email || !password || !nombre || !repeatpwd
    const navigate = useNavigate()

    //     const register= async()=>{


    //         // try {
    //         //     const userdata= createUserWithEmailAndPassword(auth,email,password)
    //         //     const user=  (await (userdata)).user

    //         //     await addDoc(collection(db,'Tienda'),{
    //         //         name: nombre,
    //         //         direction: email,
    //         //         date: new Date(),
    //         //         id: user.uid
    //         //     })
    //         //     alert('Cuenta creada')
    //         // } catch (error) {
    //         //    console.error("Error completo de Firebase:", error); 
    //         // console.error("Código de error:", error.code);
    //         // }


    //         try {
    //             const response= await axios.post('http://localhost:3000/api/auth/register',{
    //                 username: nombre,
    //                 email: email,
    //                 password: password
    //             })

    //             if(!password===repeatpwd){
    //                     setemail('')
    //                     setnombre('')
    //                     setpassword('')
    //                     setrepeatpwd('')
    //                     setmessage('passwords doesn´t match')
    //                 }

    //             navigate('/login')
    //         } catch (error) {

    //             setmessage('Error')

    //             console.log(error)
    //         }


    // }
    const register = async () => {
        if (await (!authservice.onregister(nombre, email, password, repeatpwd))) {
            setmessage(passwordmatch)
        }
        alert('count created')
        navigate('/login')
    }

    return (
        <div className={styles['register-page']}>
            <div className={styles['register-container']}>
                <h1 className={styles.title}>Registrarse</h1>
                <div className={styles.inputs}>
                    <input type="text" placeholder="name" value={nombre} onChange={(e) => setnombre(e.target.value)} />
                    <input type="text" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} />
                    <input type={!showpassword ? 'password' : 'text'} placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                    <Eye size={25} className={styles.eye} onClick={() => setshowpassword(!showpassword ? true : false)} style={{ color: !showpassword ? 'white' : 'black' }} />
                    <input type={!showconfirmpassword ? 'password' : 'text'} placeholder="repeat password" value={repeatpwd} onChange={(e) => setrepeatpwd(e.target.value)} />
                    <Eye size={25} className={styles.eye2} onClick={() => setshowconfirmpassword(!showconfirmpassword ? true : false)} style={{ color: !showconfirmpassword ? 'white' : 'black' }} />

                </div>
                <div className={styles.buttonscontainer}>
                    <button onClick={() => navigate('/login')}>Volver</button>
                    <button onClick={register} disabled={inactive} > Crear </button>
                </div>
                <p>{message}</p>
            </div>

        </div>
    )
}

export default Register