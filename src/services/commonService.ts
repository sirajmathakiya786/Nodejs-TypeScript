import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { message } from '../services/ResponseMessage';
import bcrypt from "bcrypt";

export function handleErrorResponse(req: Request ,res: Response, error: Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: message.INTERNAL_SERVER_ERROR,
        data: error.message
    })
}

export const passwordEncypt = async(password: string): Promise<string> =>{
    let salt = await bcrypt.genSalt(10);
    let passwordHash = bcrypt.hash(password, salt);
    return passwordHash;
}

export const validatePassword = (password: string)=>{
    const pattern = /^[^\s]{6,10}$/;
    return pattern.test(password);
}
