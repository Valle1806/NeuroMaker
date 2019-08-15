import express,{ json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Importar rutas
import rutasUsuario from './rutas/usuarios';
import rutasProducto from './rutas/producto'

//Inicializacion
const app= express();

//middlewares
app.use(morgan('dev'));   //Muestra por consola las peticiones que llegan
app.use(json());          //Para entender formatos JSON  
app.use(cors()); //Evita el rechazo del servidor
//Iniciar rutas
app.use('/usuario',rutasUsuario);
app.use('/producto', rutasProducto)

export default app;