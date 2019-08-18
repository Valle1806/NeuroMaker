import { Router } from 'express'
import { consultarComentarios,registrarComentario } from '../controladores/dao.comentario'

const router = Router()

router.post('/consultarComentarios',consultarComentarios)
router.post('/registrarComentario',registrarComentario)

export default router