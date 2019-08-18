import { Router } from 'express'
import { consultarCategorias, registrarCategoria } from '../controladores/dao.categoria'

const router =  Router()

router.post('/consultarCategorias',consultarCategorias)
router.post('/registrarCategoria',registrarCategoria)

export default router