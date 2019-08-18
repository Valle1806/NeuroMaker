import { Router } from 'express'
import { registrarCarrito,consultarCarritos  } from '../controladores/dao.carrito'

const router =  Router()

router.post('/registrarCarrito',registrarCarrito)
router.post('/consultarCarritos',consultarCarritos)

export default router