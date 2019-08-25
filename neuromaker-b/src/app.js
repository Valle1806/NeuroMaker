import express,{ json } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import uniqid from 'uniqid'

//Importar rutas
import rutasCalificacion from'./rutas/calificacion'
import rutasCarrito from'./rutas/carrito'
import rutasCategoria from'./rutas/categoria'
import rutasComentario from'./rutas/comentario'
import rutasDetalle_venta from'./rutas/detalle_venta'
import rutasEnvio from'./rutas/envio'
import rutasEstado_envio from'./rutas/estado_envio'
import rutasProducto from'./rutas/producto'
import rutasUsuario from'./rutas/usuario'
import uploadImage from'./rutas/uploadImage'

//Inicializacion
const app= express()

//configuración middelwares
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, uniqid()+file.originalname.match(/\.[0-9a-z]+$/i))
    }
})


//middlewares
app.use(morgan('dev'));   //Muestra por consola las peticiones que llegan
app.use(json());          //Para entender formatos JSON  
app.use(cors()); //Evita el rechazo del servidor
app.use(multer({    //Procesa las imágenes al subirse
    dest: path.join(__dirname,'public/uploads'), //path corrige la ruta
    storage
}).single('inputImage'))

//Archivos estáticos
app.use(express.static(path.join(__dirname,'public')))

//Iniciar rutas
app.use('/calificacion',rutasCalificacion)
app.use('/carrito', rutasCarrito)
app.use('/categoria', rutasCategoria)
app.use('/comentario', rutasComentario)
app.use('/detalle_venta', rutasDetalle_venta)
app.use('/envio', rutasEnvio)
app.use('/estado_envio', rutasEstado_envio)
app.use('/producto', rutasProducto)
app.use('/usuario', rutasUsuario)
app.use('/uploadImage',uploadImage)


export default app