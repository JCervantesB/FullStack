import express from 'express';
import { perfil, registrar,confirmar,autenticar} from '../controllers/VeterinarioController.js';



const router = express.Router();

router.post('/',registrar);
router.get('/confirmar/:token',confirmar);
router.post('/login/',autenticar);


router.get('/perfil',perfil);

export default router;
