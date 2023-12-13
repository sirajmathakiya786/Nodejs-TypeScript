import express, { Router } from 'express'
import { register,listUser,login,updateUser,deleteUser } from '../controller/userController';
import { validateRegister } from '../services/userValidation';
import validateRequest from '../middleware/bodyErrorSender';
const router: Router = express.Router();

router.post('/add', validateRegister,register);
router.get('/list', listUser);
router.post('/login', login);
router.patch('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser); 


export default router;