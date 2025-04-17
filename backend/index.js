import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import adminRoutes from "./routes/admin.js";


// Config
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Allow specific origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// MongoDB connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// API Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/admin", adminRoutes);

// Error Handling for Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log("CORS Headers:", res.getHeaders());
  });
  next();
});

// Start server
app.listen(port, () => {
  connect(); // Connect to MongoDB
  console.log(`🚀 Server running on port ${port}`);
});
