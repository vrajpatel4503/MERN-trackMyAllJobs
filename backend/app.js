import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes import
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js";

const app = express();

// ==================== middleware =======================

// =========== Cors ============
const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL,
  process.env.FRONTEND_URL_PROD,
].filter(Boolean); // remove undefined if any

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
};

console.log("Allowed origins:", allowedOrigins);

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json()); // Parses incoming JSON payloads in req.body, useful for APIs receiving JSON data.

app.use(cookieParser()); // Parses cookies attached to the client request and makes them available under req.cookies.

app.use(express.urlencoded({ extended: true })); //Parses incoming requests with URL-encoded data (e.g., form submissions). The extended: true allows nested objects.

//  Temporary route to check Node.js version
app.get("/node-version", (req, res) => {
  res.json({ node: process.version });
});


// ============== Routes declaration ====================
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// ----- export default app ---------
export default app;
