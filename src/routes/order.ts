import express, {Router} from 'express';
const router: Router = express.Router();
import { createOrder,verifyPayment } from '../controller/orderController';


router.post('/create', createOrder);
router.post('/verify-payment', verifyPayment);

export default router;