import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        Business_ID?: string;
        Branch_ID?: string;
      };
    }
  }
}

export {};
