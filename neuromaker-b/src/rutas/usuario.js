import {Router} from 'express';
import { registrarUsuario, loginUsuario, obtenerDatosUsuario } from '../controladores/dao.usuario'

export const router = Router()

router.post('/registrarUsuario', registrarUsuario)
router.post('/loginUsuario', loginUsuario)
router.post('/obtenerDatosUsuario',obtenerDatosUsuario)

export default router