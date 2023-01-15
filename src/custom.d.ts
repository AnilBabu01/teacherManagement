declare namespace Express {
  export interface Request {
    user?: {
      empId?: number | null;
      name: string;
      email: string;
      password: string;
      designation: any;
      status: "ACTIVE" | "DELETED" | "PENDING";
    };

    files?: any[{
      filename;
    }];

    images?: any[{
      Productimage;
    }];
  }
}
