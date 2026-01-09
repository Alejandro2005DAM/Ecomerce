// Importación de dependencias principales
import express from 'express'         // Framework web para Node.js
import { connDB } from './config/db.js' // Configuración de la conexión a MongoDB
import dotenv from 'dotenv'           // Para manejar variables de entorno
import router from './routes/Authentication.js' // Rutas de autenticación
import cors from 'cors'               // Middleware para habilitar CORS
// Cargar variables de entorno desde el archivo .env
dotenv.config()

// Inicializar la aplicación de Express
const app = express()

// Configuración del puerto del servidor
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())                      // Habilita CORS para todas las rutas
app.use(express.json())              // Permite el parseo de JSON en las peticiones

// Rutas de la API
app.use('/api/auth', router)         // Todas las rutas de autenticación empiezan con /api/auth

// Ejemplo de ruta básica (actualmente comentada)
// app.get('/onlineshop', (req, res)=>{
//     res.send('hello word')
// })

// Establecer conexión con la base de datos
connDB()

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})


