import { Request, Response } from "express";
import knex from "../db";

export const createTender = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.user?.id;
  const { title, description, deadline, budget } = req.body;

  if (!title || !description || !deadline || !budget) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const [tender] = await knex("tenders")
      .insert({
        title,
        description,
        budget: parseFloat(budget),
        deadline: new Date(deadline),
        created_by: userId,
      })
      .returning("*");

    return res.status(201).json({ message: "Tender created", tender });
  } catch (error) {
    console.error("Error creating tender:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
