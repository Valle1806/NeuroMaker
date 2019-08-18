import { Router } from 'express'
import { consultarProductos, registrarProducto, consultarProducto } from '../controladores/dao.producto'

const router = Router()

router.post('/consultarProductos', consultarProductos)
router.post('/registrarProducto', registrarProducto)
router.post('/consultarProducto/:id', consultarProducto)

export default router