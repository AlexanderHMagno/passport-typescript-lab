import session from "express-session";

export {};

declare global {
  namespace Express {
    export interface User {
      id: number;
      name: string;
      email?: string;
      password?: string;
      role?: string;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    passport?: {
      user: number;
    };
  }
}
