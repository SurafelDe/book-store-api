import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.TokenSecret || "secret";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
    // Attach the decoded token payload to the request object for further use
    // req.user = decoded;
    next(); // Call the next middleware or route handler
  });
};
