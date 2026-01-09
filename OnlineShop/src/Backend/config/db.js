// Importación de mongoose para la conexión con MongoDB
import mongoose from "mongoose";

/**
 * Función asíncrona para establecer conexión con la base de datos MongoDB
 * Utiliza la variable de entorno MONGO_URI para la cadena de conexión
 */
export const connDB = async () => {
    try {
        // Intenta establecer la conexión con MongoDB usando la URI del archivo .env
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // Mensaje de éxito mostrando el host al que se conectó
        console.log(`Conexión exitosa a MongoDB en: ${conn.connection.host}`);
    } catch (error) {
        // En caso de error, muestra el error y termina el proceso con código de error
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Termina el proceso con código de error
    }
}