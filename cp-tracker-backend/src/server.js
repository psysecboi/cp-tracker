    import express from "express";
    import dotenv from "dotenv";
    import cors from "cors";
    import helmet from "helmet";
    import morgan from "morgan";
    import rateLimit from "express-rate-limit";
    import connectDB from "./config/db.js";

    dotenv.config();
    connectDB(); //calling the function to connect to the database

    const app = express();

    // Middleware
    app.use(express.json()); // Parse JSON requests
    app.use(cors()); // Enable Cross-Origin Resource Sharing
    app.use(helmet()); // Security Headers
    app.use(morgan("dev")); // Logging
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

    // Rate Limiting
    const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    });
    app.use(limiter);

    // Default Route
    app.get("/", (req, res) => {
    res.send("Welcome to the Competitive Programming Tracker API!");
    });

    // Server Listening
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
