import pool from "../db/index.js";

export const getAllJobs = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM jobs");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};
