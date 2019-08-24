import { Router } from 'express'
import { consultarProductos, registrarProducto, consultarProducto, consultarComentarios, filtarProductos, filtrarPCategorias } from '../controladores/dao.producto'

const router = Router()
router.post('/consultarProductos', consultarProductos)
router.post('/registrarProducto', registrarProducto)
router.post('/consultarProducto/:id', consultarProducto)
router.post('/consultarComentarios/:id', consultarComentarios)
router.post('/filtrarProductos/:filtro',filtarProductos)
router.post('/filtrarPCategorias/:categoria',filtrarPCategorias)
export default router