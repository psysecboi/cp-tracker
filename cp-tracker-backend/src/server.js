import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';  // Ensure file extension is .js
import contestRoutes from './routes/contestRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());  // Middleware to parse JSON

app.use('/api/contests', contestRoutes);  // Register route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
