import { Router } from 'express'
import { registarCalificacion,consultarCalificaciones  } from '../controladores/dao.calificacion'

const router = Router()

router.post('/registarCalificacion',registarCalificacion)
router.post('/consultarCalificaciones',consultarCalificaciones)

export default router

