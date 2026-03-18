import styles from './Historypays.module.css'
import { Authcontext } from '../../Context/Authcontext'
import { useContext } from 'react'

function Historypays() {
    const { username } = useContext(Authcontext)
    return (
        <div className={styles.bg}>
            <h1> All historial of {username} payments </h1>
        </div>
    )
}

export default Historypays