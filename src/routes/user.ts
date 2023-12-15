import express, { Router } from 'express'
import { register,listUser,login,updateUser,deleteUser } from '../controller/userController';
import { validateRegister } from '../services/userValidation';
import validateRequest from '../middleware/bodyErrorSender';
import { verifyJwtToken } from '../middleware/auth';
const router: Router = express.Router();

router.post('/add', validateRegister,register);
router.get('/list', verifyJwtToken,listUser);
router.post('/login', login);
router.patch('/update/:id', verifyJwtToken,updateUser);
router.delete('/delete/:id', verifyJwtToken,deleteUser); 


export default router;