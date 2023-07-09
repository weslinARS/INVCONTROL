import {Router} from 'express'
import { DeleteCashRegister, getCashRegister,postCashRegister } from '../controllers/cashRegister.controller.js';
import {postCashRegisterValidator} from '../validators/index.js'
import {requireAuthentication} from '../middleware/requireAuthentication.middleware.js'
const router = Router();

router.get('/cashRegister',requireAuthentication,getCashRegister);

router.post('/cashRegister',requireAuthentication,postCashRegisterValidator(),postCashRegister);

router.put('/cashRegister/:id',);

router.delete('/cashRegister/:id', DeleteCashRegister)

export default router;