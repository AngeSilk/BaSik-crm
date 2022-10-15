import mongoose from 'mongoose';

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión con la base de datos');
    }

}

export {
    dbConnection
}