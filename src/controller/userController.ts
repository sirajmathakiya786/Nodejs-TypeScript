import { Request, Response } from 'express';
import { handleErrorResponse } from '../services/commonService';
import { passwordEncypt } from "../services/commonService";
import User from "../model/user"
import { StatusCodes } from 'http-status-codes';
import { message } from '../services/ResponseMessage';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from 'express-validator';

const register = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, phoneNumber } = req.body
        let passwordHash = await passwordEncypt(password)
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.status(409).json({ status: StatusCodes.CONFLICT, message: message.USER_EMAIL_EXISTS })
        }
        const addData = await User.create(
            {
                name,
                email,
                password: passwordHash,
                phoneNumber
            }
        )
        return res.status(201).json({
            status: StatusCodes.CREATED,
            message: message.USER_CREATED,
            data: addData
        })
    } catch (error) {
        return handleErrorResponse(req, res, error as Error);
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(409).json({ status: StatusCodes.CONFLICT, message: message.USER_EMAIL_NOT_FOUND })
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ status: StatusCodes.BAD_REQUEST, message: message.USER_INVALID_PASSWORD })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY as any, {
            expiresIn: "12h"
        })
        return res.status(200).json({
            status: StatusCodes.OK,
            message: message.USER_LOGIN,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber
            },
            token
        })
    } catch (error) {
        return handleErrorResponse(req, res, error as Error);
    }
}

const listUser = async (req: Request, res: Response) => {
    try {
        const getUserData = await User.find({
            isDeleted: false
        }).select('-password').sort({ createdAt: -1 })
        return res.status(200).json({
            status: StatusCodes.OK,
            message: message.USER_DATA_GET,
            data: getUserData
        })
    } catch (error) {
        return handleErrorResponse(req, res, error as Error);
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedId = req.params.id
        const { name, email, password, phoneNumber } = req.body
        let passwordHash = await passwordEncypt(password)
        const user = await User.findById(updatedId);
        if (!user) {
            return res.status(404).json({ status: StatusCodes.NOT_FOUND, message: message.USER_NOT_FOUND });
        }
        const existEmail = await User.findOne({ email, _id: { $ne: user._id } });
        if (existEmail) {
            return res.status(409).json({ status: StatusCodes.CONFLICT, message: message.USER_EMAIL_EXISTS })
        }
        const updatedData = await User.findByIdAndUpdate(
            { _id: updatedId },
            { $set: { name, email, password: passwordHash, phoneNumber } },
            { new: true }
        )
        return res.status(200).json({ status: StatusCodes.OK, message: message.USER_DATA_UPDATED, data: updatedData })
    } catch (error) {
        return handleErrorResponse(req, res, error as Error)
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedId = req.params.id
        const user = await User.findById(deletedId);
        if (!user) {
            return res.status(409).json({ status: StatusCodes.CONFLICT, message: message.USER_NOT_FOUND })
        }
        const deleteData = await User.findByIdAndUpdate(
            { _id: deletedId },
            { $set: { isDeleted: true } },
            { new: true }
        )
        return res.status(200).json({ status: StatusCodes.GONE, message: message.USER_DELETED, data: deleteData })
    } catch (error) {
        return handleErrorResponse(req, res, error as Error);
    }
}

export { register, listUser, login, updateUser, deleteUser }