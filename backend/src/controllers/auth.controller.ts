import db from "../db";
import bcrypt from "bcryptjs";

import { Request, Response } from "express";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password, companyName } = req.body;

  try {
    if (!email || !password || !companyName) {
      return res.status(400).json({ error: "Missing fields", body: req.body });
    }

    const existingUser = await db("users").where({ email }).first();
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db("users")
      .insert({
        email,
        password: hashedPassword,
        company_name: companyName,
      })
      .returning(["id", "email", "company_name"]);
    return res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Signup failed", detail: error });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;
  try {
    const user = await db("users").where({ email }).first();
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    return res.status(200).json({ message: "Login successful", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Login failed", detail: error });
  }
};
