declare namespace Express {
  export interface Request {
    user?: {
      empId?: number | null;
      name: string;
      email: string;
      password: string;
    };
  }
}
