import styles from './Navbar.module.css'
import { HomeIcon, ShoppingCart,Trash,User } from "lucide-react"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Authcontext } from '../../Context/Authcontext'
import { useContext, useEffect } from 'react'
import axios from 'axios'
import { Onhoverscale } from '../../Animations/Animations'
import { motion } from "framer-motion"

function Navbar(){
const {email,isauthenticathed,username}= useContext(Authcontext)
const navigate= useNavigate()

useEffect(()=>{
    
})



const deleteaccount=async ()=>{


try {
    const response = await axios.delete('http://localhost:3000/api/auth/delete',{
        data:{
            email:email
        }
    })
    alert('account deleted')
    navigate('/login')
} catch (error) {
    console.log(error)
}

}


   return(
      <nav className={styles.navlinks}>
                    <motion.button className={styles.home} onClick={()=>navigate('/login')} {...Onhoverscale}><HomeIcon style={{color: 'red'}}/></motion.button>
                    <h1 className={styles.title}>TechShop</h1>
                    <div className={styles.elements}>
                        <Link to='/favorites'className={styles.link} ><motion.p{...Onhoverscale}>Favoritos</motion.p></Link>
                        <Link to='/shop' className={styles.link}><motion.p {...Onhoverscale}>Tienda</motion.p></Link>
                        <Link to='/about'className={styles.link}><motion.p {...Onhoverscale}>Sobre nosotros</motion.p></Link>
                        <Link to='/contact'className={styles.link} ><motion.p{...Onhoverscale}>Contacto</motion.p></Link>

                        {/* <h3>{email}</h3> */}
                    </div>
                    <div className={styles.subelements}>
                        <Link to='/cart'><ShoppingCart color="rgb(1,1,1)" size={70}/></Link>
                        <h3>{isauthenticathed ? username : "Invited"}</h3>
                        <Trash color='rgba(255, 255, 255, 1)' size={70} onClick={deleteaccount}/>
                        <Link to='/myaccount'><User className={styles.user} size={70} color='black'/></Link>
                        
                    </div>


                </nav>
    )
}


export default Navbar