import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes import
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js";

const app = express();

// ==================== middleware =======================
const corsOptions = {
  origin: process.env.FRONTEND_URL|| "http://localhost:5173", // Allow only frontend URL
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));

app.use(express.json()); // Parses incoming JSON payloads in req.body, useful for APIs receiving JSON data.

app.use(cookieParser()); // Parses cookies attached to the client request and makes them available under req.cookies.

app.use(express.urlencoded({ extended: true })); //Parses incoming requests with URL-encoded data (e.g., form submissions). The extended: true allows nested objects.

// ============== Routes declaration ====================
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// ----- export default app ---------
export default app;
