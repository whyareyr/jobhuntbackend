import dotenv from "dotenv";
dotenv.config();

export const serverPort = process.env.SERVER_PORT || 3001;
