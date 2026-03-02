import Navbar from '../../Components/Navbar'// import { Bar } from "../Shop/Shop"
import styles from './About.module.css'

function About() {
 
    return(
    <div className={styles.bgshop}>
        <Navbar/>
        {/* {<Bar/>} */}
        <div className={styles.section}>
        <h1>Sobre nosotros</h1>
        <p>Somos una tienda tecnológica de confiaza que brindamos los mejores productos a buen precio</p>
        </div>
        
    </div>
    )

}

export default About