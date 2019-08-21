import { Router } from 'express'
import { consultarProductos, registrarProducto, consultarProducto, consultarComentarios } from '../controladores/dao.producto'

const router = Router()
router.post('/consultarProductos', consultarProductos)
router.post('/registrarProducto', registrarProducto)
router.post('/consultarProducto/:id', consultarProducto)
router.post('/consultarComentarios/:id', consultarComentarios)
export default router