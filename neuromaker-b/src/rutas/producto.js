import { Router } from 'express';
import { traerProducto, registrarProducto } from '../controladores/dao.producto';
const router = Router();
// /usuario
router.post('/traer', traerProducto);
router.post('/registrar', registrarProducto);

export default router;