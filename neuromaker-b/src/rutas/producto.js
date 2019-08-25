import { Router } from 'express'
import { consultarProductos, publicarProducto, consultarProducto, consultarComentarios, filtarProductos, filtrarPCategorias } from '../controladores/dao.producto'

const router = Router()
router.post('/consultarProductos', consultarProductos)
router.post('/publicarProducto', publicarProducto)
router.post('/consultarProducto/:id', consultarProducto)
router.post('/consultarComentarios/:id', consultarComentarios)
router.post('/filtrarProductos/:filtro',filtarProductos)
router.post('/filtrarPCategorias/:categoria',filtrarPCategorias)
export default router