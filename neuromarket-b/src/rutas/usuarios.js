import { Router } from 'express';
import { crearUsuario, loginUsuario } from '../controladores/dao.usario';
const router = Router();
// /usuario
router.post('/create', crearUsuario);
router.post('/login', loginUsuario);

export default router;