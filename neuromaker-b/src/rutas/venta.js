import { Router } from 'express'
import { registrarVenta } from '../controladores/dao.venta'

const router = Router()

router.post('/registrarVenta',registrarVenta)

export default router