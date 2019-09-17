import {Router} from 'express';
import { registrarUsuario, loginUsuario, obtenerDatosUsuario, obtenerCompras, obtenerVentas } from '../controladores/dao.usuario'

export const router = Router()

router.post('/registrarUsuario', registrarUsuario)
router.post('/loginUsuario', loginUsuario)
router.post('/obtenerDatosUsuario',obtenerDatosUsuario)
router.post('/obtenerCompras', obtenerCompras)
router.post('/obtenerVentas', obtenerVentas)

export default router