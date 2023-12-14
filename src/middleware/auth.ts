import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../model/user';

// Extend Request type to include a user property
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const verifyJwtToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void | Response> => {
  const token = req.headers.token as string | undefined;
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY as any ) as JwtPayload | undefined;
    if (verified) {
      const isUserExists = await User.findOne({
        _id: verified?._id,
      });
      if (isUserExists) {
        req.user = verified;
        next();
      } else {
        return res.status(401).send({
          success: false,
          message: "Invalid token",
        });
      }
    } else {
      return res.status(401).send({
        success: false,
        message: "Token Expired",
      });
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Invalid token",
    });
  }
};

export { verifyJwtToken };
