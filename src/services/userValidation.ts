// import express, { Request, Response, NextFunction } from 'express'
import { body } from 'express-validator';


const validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email formate'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phoneNumber').isMobilePhone(['any']).withMessage('Invalid phone number format'),
]

export { validateRegister }