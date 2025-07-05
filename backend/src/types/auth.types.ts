import { Request } from "express";

export type AuthRequest = Request<{}, {}, {
  email: string;
  password: string;
}>;

export type RegisterRequest = Request<{}, {}, {
  companyName: string;
  email: string;
  password: string;
}>;
