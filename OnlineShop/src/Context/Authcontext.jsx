import { Children, createContext, useEffect, useState } from "react";
import axios from "axios";

const Authcontext= createContext()



const Authprovider=({children})=>{

const [email,setemail]= useState('')
const [password,setpassword]= useState('')
const [isauthenticathed, setauthenticated]= useState(false)
const[username,setusername]= useState('')

useEffect(()=>{
    const cargarusername= async()=>{
     
        try {
            const response = await axios.get(`http://localhost:3000/api/auth/getusername/${email}`)
            setusername(response.data.username)
        } catch (error) {
            console.log(error)
        }
    }

    cargarusername()
})
// const onchangeemail=(value)=>{

//     setemail(value)
// }

return(

    <Authcontext.Provider 
    value={{
        email, setemail,isauthenticathed,setauthenticated,password,setpassword,username 
    }}>

    {children}
    </Authcontext.Provider>
)

}
export {Authcontext,Authprovider}