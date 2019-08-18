import { Router } from 'express'
import { consultarEnvio, registrarEnvio } from '../controladores/dao.envio'

const router =  Router()

router.post('/consultarEnvio',consultarEnvio)
router.post('/registrarEnvio',registrarEnvio)

export default router