import express,{ json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Importar rutas
import rutasUsuario from './rutas/usuarios';

//Inicializacion
const app= express();

//middlewares
app.use(morgan('dev'));   //Muestra por consola las peticiones que llegan
app.use(json());          //Para entender formatos JSON  
app.use(cors()); //Evita el rechazo del servidor
//Iniciar rutas
app.use('/usuario',rutasUsuario);

export default app;