import type { Request, Response, NextFunction } from 'express';
import ErrorApi from '../helpers/ErrorApi';
import Jwt from '../helpers/JsonWebToken';
import type { JwtPayload } from 'jsonwebtoken';

const jwt = new Jwt();

function validateToken(req: Request, _res: Response, next: NextFunction): void {
  const token = req.headers.authorization;

  if (token == null) {
    throw new ErrorApi('Token not found', 401);
  }

  const decoded = jwt.verifyToken(token);
  req.headers.store = (decoded as JwtPayload).name;

  next();
}

export default validateToken;
