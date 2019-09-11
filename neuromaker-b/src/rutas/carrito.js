import { Router } from 'express'

import { registrarCarrito,consultarCarritos, borrarProductoCarrito} from '../controladores/dao.carrito'

const router =  Router()

router.post('/registrarCarrito',registrarCarrito)
router.post('/consultarCarritos/:id_comprador',consultarCarritos)
router.post('/borrarProductoCarrito',borrarProductoCarrito)
export default router