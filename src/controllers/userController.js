// import pool from "../db/index.js";

// export const getSavedJobs = async (req, res, next) => {
//   try {
//     const userId = req.auth.userId;
//     console.log("User ID:", userId); // Check if this is being correctly retrieved

//     const result = await pool.query(
//       "SELECT jobs.* FROM saved_jobs JOIN jobs ON saved_jobs.job_id = jobs.id WHERE saved_jobs.user_id = $1",
//       [userId]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getAppliedJobs = async (req, res, next) => {
//   try {
//     const userId = req.auth.userId;
//     const result = await pool.query(
//       "SELECT jobs.* FROM applied_jobs JOIN jobs ON applied_jobs.job_id = jobs.id WHERE applied_jobs.user_id = $1",
//       [userId]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     next(err);
//   }
// };

import pool from "../db/index.js";

export const getSavedJobs = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    console.log(req.auth); // Check if userId exists here
    console.log("User ID:", userId); // Debug log

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User ID not found" });
    }

    const result = await pool.query(
      "SELECT jobs.* FROM saved_jobs JOIN jobs ON saved_jobs.job_id = jobs.id WHERE saved_jobs.user_id = $1",
      [userId]
    );

    console.log("Saved jobs query executed, found:", result.rows.length); // Debug log
    res.json(result.rows);
  } catch (err) {
    console.error("Error in getSavedJobs:", err.message);
    next(err);
  }
};

export const getAppliedJobs = async (req, res, next) => {
  try {
    const userId = req.auth.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User ID not found" });
    }

    const result = await pool.query(
      "SELECT jobs.* FROM applied_jobs JOIN jobs ON applied_jobs.job_id = jobs.id WHERE applied_jobs.user_id = $1",
      [userId]
    );

    console.log("Applied jobs query executed, found:", result.rows.length); // Debug log
    res.json(result.rows);
  } catch (err) {
    console.error("Error in getAppliedJobs:", err.message);
    next(err);
  }
};

export const saveJob = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const { jobId } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User ID not found" });
    }

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Check if job exists
    const jobCheck = await pool.query("SELECT id FROM jobs WHERE id = $1", [
      jobId,
    ]);
    if (jobCheck.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if already saved
    const existCheck = await pool.query(
      "SELECT * FROM saved_jobs WHERE user_id = $1 AND job_id = $2",
      [userId, jobId]
    );

    if (existCheck.rows.length > 0) {
      return res.status(400).json({ message: "Job already saved" });
    }

    // Save the job
    await pool.query(
      "INSERT INTO saved_jobs (user_id, job_id) VALUES ($1, $2)",
      [userId, jobId]
    );

    res.status(201).json({ message: "Job saved successfully" });
  } catch (err) {
    console.error("Error in saveJob:", err.message);
    next(err);
  }
};

export const unsaveJob = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const { jobId } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User ID not found" });
    }

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const result = await pool.query(
      "DELETE FROM saved_jobs WHERE user_id = $1 AND job_id = $2",
      [userId, jobId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Job not found in saved list" });
    }

    res.json({ message: "Job unsaved successfully" });
  } catch (err) {
    console.error("Error in unsaveJob:", err.message);
    next(err);
  }
};

export const applyToJob = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const { jobId } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User ID not found" });
    }

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Check if job exists
    const jobCheck = await pool.query("SELECT id FROM jobs WHERE id = $1", [
      jobId,
    ]);
    if (jobCheck.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if already applied
    const existCheck = await pool.query(
      "SELECT * FROM applied_jobs WHERE user_id = $1 AND job_id = $2",
      [userId, jobId]
    );

    if (existCheck.rows.length > 0) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    // Record the application
    await pool.query(
      "INSERT INTO applied_jobs (user_id, job_id) VALUES ($1, $2)",
      [userId, jobId]
    );

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error("Error in applyToJob:", err.message);
    next(err);
  }
};

export const unapplyJob = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const { jobId } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User ID not found" });
    }

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const result = await pool.query(
      "DELETE FROM applied_jobs WHERE user_id = $1 AND job_id = $2",
      [userId, jobId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Job not found in applied list" });
    }

    res.json({ message: "Job unapplied successfully" });
  } catch (err) {
    console.error("Error in unapplyJob:", err.message);
    next(err);
  }
};
