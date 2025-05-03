import pool from "../db/index.js";

export const getSavedJobs = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const result = await pool.query(
      "SELECT jobs.* FROM saved_jobs JOIN jobs ON saved_jobs.job_id = jobs.id WHERE saved_jobs.user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const getAppliedJobs = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const result = await pool.query(
      "SELECT jobs.* FROM applied_jobs JOIN jobs ON applied_jobs.job_id = jobs.id WHERE applied_jobs.user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};
