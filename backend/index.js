import app from "./app.js";
import dotenv from "dotenv";
import { dbConnection } from "./db/dbConnection.js";

// ------- dotenv config ---------
dotenv.config();

// -------- Database connection ---------
dbConnection();

const port = process.env.PORT || 8000;

// Run normally on localhost
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
