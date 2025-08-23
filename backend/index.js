import app from "./app.js";
import dotenv from "dotenv";
import { dbConnection } from "./db/dbConnection.js";

// ------- dotenv config ---------
dotenv.config();

// -------- Database connection ---------
dbConnection()

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
