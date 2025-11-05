import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role: string;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : undefined;

  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

export const authorize =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: "Not authorized" });
    if (!roles.includes(user.role)) return res.status(403).json({ message: "Forbidden: insufficient role" });
    next();
  };