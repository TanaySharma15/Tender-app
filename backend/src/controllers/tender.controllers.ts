import { Request, Response } from "express";
import knex from "../db";
import db from "../db";

export const createTender = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  const { title, description, deadline, budget } = req.body;

  if (!title || !description || !deadline || !budget) {
    res.status(400).json({ message: "All fields are required." });
    return;
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

    res.status(201).json({ message: "Tender created", tender });
  } catch (error) {
    console.error("Error creating tender:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const browseTenders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const search = req.query.search?.toString().trim() || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    // Build base query
    const baseQuery = knex("tenders")
      .join("users", "tenders.created_by", "users.id")
      .whereNot("tenders.created_by", userId);

    if (search) {
      baseQuery.andWhere((qb) => {
        qb.whereILike("tenders.title", `%${search}%`)
          .orWhereILike("tenders.description", `%${search}%`)
          .orWhereILike("users.company_name", `%${search}%`);
      });
    }

    // Get total count
    const total = await baseQuery.clone().count("tenders.id as count").first();

    // Get paginated tenders
    const rows = await baseQuery
      .clone()
      .select(
        "tenders.id",
        "tenders.title",
        "tenders.description",
        "tenders.budget",
        "tenders.deadline",
        "tenders.created_at",
        "tenders.updated_at",
        "users.company_name"
      )
      .orderBy("tenders.created_at", "desc")
      .limit(limit)
      .offset(offset);

    const tenders = rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      budget: row.budget,
      deadline: row.deadline,
      created_at: row.created_at,
      updated_at: row.updated_at,
      company: {
        name: row.company_name,
      },
    }));

    res.json({
      page,
      limit,
      total: Number(total?.count || 0),
      totalPages: Math.ceil(Number(total?.count || 0) / limit),
      tenders,
    });
  } catch (err) {
    console.error("Error browsing tenders:", err);
    res.status(500).json({ message: "Failed to browse tenders" });
  }
};

export const getMyTenders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const allTenders = await db("tenders").where({ created_by: user.id });

    const totalTenders = allTenders.length;
    const activeTenders = allTenders.filter(
      (t) => new Date(t.deadline) > new Date()
    );

    res.json({
      totalTenders,
      activeTendersCount: activeTenders.length,
      tenders: allTenders,
    });
  } catch (err) {
    console.error("Error in getMyTenders:", err);
    res.status(500).json({ message: "Failed to fetch your tenders" });
  }
};

export const getTenderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { tenderId } = req.params;

  try {
    const tender = await knex("tenders")
      .join("users", "tenders.created_by", "users.id")
      .where("tenders.id", tenderId)
      .select(
        "tenders.*",
        "users.company_name as creator_company",
        "users.email as creator_email"
      )
      .first();

    if (!tender) {
      res.status(404).json({ message: "Tender not found" });
      return;
    }

    res.json(tender);
  } catch (error) {
    console.error("Error fetching tender by ID:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
