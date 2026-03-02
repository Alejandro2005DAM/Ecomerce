import Navbar from "../../Components/Navbar"
import { useContext } from "react"
import { Favoritecontext } from "../../Context/Favoritecontext"
import styles from "./Favorites.module.css"

function Favorites(){
const{element}=useContext(Favoritecontext)
    return(
        <>
        
        <div className={styles.bgshop}>
            <Navbar/>
        <h1 className={styles.title}>Lista de favoritos</h1>
        <div className={styles.container}>
        {
            element.map((item)=>(
                <div className={styles.card}>
                    <p className={styles.name}>{item.nombre}</p>
                    <img src={item.imagen} alt="" />
                    <p className={styles.price}>{item.precio} €</p>
                    <p className={styles.description}>{item.descripcion}</p>
                </div>
            ))
        }    
        </div>
        </div>
        </>
    )
    
}

export default Favorites