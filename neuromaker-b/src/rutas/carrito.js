import { Router } from 'express'

import { registrarCarrito,consultarCarritos, borrarProductoCarrito, 
    buscarUnProductoCarrito, borrarProductosCarrito} from '../controladores/dao.carrito'

const router =  Router()

router.post('/registrarCarrito',registrarCarrito)
router.post('/consultarCarritos/:id_comprador',consultarCarritos)
router.post('/borrarProductoCarrito',borrarProductoCarrito)
router.post('/buscarUnProductoCarrito',buscarUnProductoCarrito)
router.post('/borrarProductosCarrito',borrarProductosCarrito)
export default router