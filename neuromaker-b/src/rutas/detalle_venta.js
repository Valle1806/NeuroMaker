import { Router } from 'express'
import { consultarDetalle,registrarDetalle } from '../controladores/dao.detalle_venta'

const router = Router()

router.post('/consultarDetalle',consultarDetalle)
router.post('/registrarDetalle',registrarDetalle)

export default router