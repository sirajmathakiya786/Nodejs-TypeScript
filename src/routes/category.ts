import express, { Router } from 'express'
const router: Router = express.Router();
import { addCategory } from "../controller/categoryController";

router.post('/add', addCategory)

export default router;