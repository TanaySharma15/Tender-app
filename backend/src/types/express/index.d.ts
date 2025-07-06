import "express";

declare module "express" {
  export interface Request {
    user?: {
      id: number;
      email: string;
      company_name?: string;
    };
    file?: Express.Multer.File;
  }
}
