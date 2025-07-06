import { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";
import db from "../db";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export const uploadMiddleware = upload.single("image");

export const handleMulterError = (
  error: any,
  req: any,
  res: any,
  next: any
) => {
  if (error && error.code) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File size too large. Maximum 5MB allowed." });
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ message: "Unexpected file field." });
    }
  }
  if (error && error.message && error.message.includes("Only image files")) {
    return res.status(400).json({ message: "Only image files are allowed." });
  }
  next(error);
};

export const createCompany = async (req: any, res: any): Promise<void> => {
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
    let logoUrl = null;
    const file = req.file as Express.Multer.File | undefined;

    if (file) {
      try {
        if (!file.mimetype.startsWith("image/")) {
          res.status(400).json({ message: "Only image files are allowed." });
          return;
        }

        const fileExt = file.originalname?.split(".").pop() || "jpg";
        console.log("File ext->", fileExt);

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;
        const filePath = `company-logos/${fileName}`;
        console.log("file path-> ", filePath);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("company-logo")
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
          });

        if (uploadError) {
          res.status(500).json({ message: "Failed to upload image" });
          return;
        }

        const { data: urlData } = supabase.storage
          .from("company-logo")
          .getPublicUrl(filePath);

        logoUrl = urlData.publicUrl;
      } catch (imageError) {
        console.error("Image processing error:", imageError);
        res.status(500).json({ message: "Failed to process image" });
        return;
      }
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
        logo: logoUrl,
      })
      .returning("*");

    res.status(201).json({
      ...company,
      services:
        typeof company.services === "string"
          ? JSON.parse(company.services)
          : company.services,
    });
  } catch (err) {
    console.error("Error creating company:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCompaniesExceptUserCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const companies = await db("companies").select("*");

    res.status(200).json({ companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
