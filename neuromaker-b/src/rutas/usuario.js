import {Router} from 'express';
import { registrarUsuario, loginUsuario } from '../controladores/dao.usuario'

export const router = Router()

router.post('/registrarUsuario', registrarUsuario)
router.post('/loginUsuario', loginUsuario)

export default router