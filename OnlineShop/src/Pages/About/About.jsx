import Navbar from '../../Components/Navbar'
import styles from './About.module.css'
import { motion } from "framer-motion"
import { ShieldCheck, Truck, Headphones, BadgeCent } from "lucide-react"

function About() {
    return (
        <div className={styles.bgshop}>
            <Navbar />

            <div className={styles.container}>
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.hero}
                >
                    <div className={styles.heroText}>
                        <h1 className={styles.title}>Nuestra <span>Historia</span></h1>
                        <p className={styles.subtitle}>
                            Nacimos de la pasión por la tecnología para ofrecerte los mejores productos
                            del mercado. Somos más que una tienda, somos tu aliado tecnológico de confianza.
                        </p>
                    </div>
                    <div className={styles.heroImage}>
                        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="TechShop Team working" />
                        <div className={styles.imageOverlay}></div>
                    </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={styles.features}
                >
                    <h2 className={styles.sectionTitle}>¿Por qué elegir <span>TechShop</span>?</h2>

                    <div className={styles.grid}>
                        <div className={styles.featureCard}>
                            <div className={styles.iconWrapper}>
                                <ShieldCheck size={32} />
                            </div>
                            <h3>Garantía Total</h3>
                            <p>Todos nuestros productos cuentan con garantía extendida para tu máxima tranquilidad.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.iconWrapper}>
                                <BadgeCent size={32} />
                            </div>
                            <h3>Mejor Precio</h3>
                            <p>Te aseguramos la mejor relación calidad-precio del mercado en tecnología punta.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.iconWrapper}>
                                <Truck size={32} />
                            </div>
                            <h3>Envío Rápido</h3>
                            <p>Recibe tus compras en 24/48h en cualquier parte del país, rápido y seguro.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.iconWrapper}>
                                <Headphones size={32} />
                            </div>
                            <h3>Soporte 24/7</h3>
                            <p>Nuestro equipo de expertos está siempre disponible para resolver tus dudas gratis.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className={styles.mission}
                >
                    <div className={styles.missionContent}>
                        <h2>Nuestra Misión</h2>
                        <p>
                            Democratizar el acceso a la tecnología de última generación.
                            Creemos que todo el mundo merece tener a su alcance las mejores herramientas digitales
                            para potenciar su vida personal y profesional, sin tener que pagar precios inflados.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default About