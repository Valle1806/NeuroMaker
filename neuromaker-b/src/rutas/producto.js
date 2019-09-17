import { Router } from 'express'
import { consultarProductos, publicarProducto, 
    consultarProducto, consultarComentarios,
     filtarProductos, filtrarPCategorias,
      consultarCantidadVentaProducto,restarCantidadVentaProducto } from '../controladores/dao.producto'

const router = Router()
router.post('/consultarProductos', consultarProductos)
router.post('/publicarProducto', publicarProducto)
router.post('/consultarProducto/:id', consultarProducto)
router.post('/consultarComentarios/:id', consultarComentarios)
router.post('/filtrarProductos/:filtro',filtarProductos)
router.post('/filtrarPCategorias/:categoria',filtrarPCategorias)
router.post('/consultarCantidadVentaProducto',consultarCantidadVentaProducto)
router.post('/restarCantidadVentaProducto',restarCantidadVentaProducto)

export default router