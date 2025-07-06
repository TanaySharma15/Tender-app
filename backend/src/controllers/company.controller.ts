import { Request, Response } from "express";
import db from "../db";

export const createCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      industry,
      location,
      description,
      services,
      employees,
      founded,
      website,
    } = req.body;

    if (
      !name ||
      !industry ||
      !location ||
      !description ||
      !services ||
      !employees ||
      !founded ||
      !website
    ) {
      res.status(400).json({ message: "Missing required fields." });
      return;
    }

    const [company] = await db("companies")
      .insert({
        name,
        industry,
        location,
        description,
        services: JSON.stringify(services),
        employees,
        founded,
        website,
      })
      .returning("*");

    res.status(201).json(company);
  } catch (err) {
    console.error("Error creating company:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
