import { Request, Response } from "express"
import { handleErrorResponse } from "../services/commonService"


const addCategory = async(req: Request, res: Response)=>{
    try {
        
    } catch (error) {
        return handleErrorResponse(req,res,error as Error);
    }
}

export { addCategory }