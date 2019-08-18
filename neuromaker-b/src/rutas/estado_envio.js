import { Router } from 'express'
import { consultarEstado_envio,registrarEstado_envio } from '../controladores/dao.estado_envio'

const router =  Router()

router.post('/consultarEstado_envio',consultarEstado_envio)
router.post('/registrarEstado_envio',registrarEstado_envio)

export default router