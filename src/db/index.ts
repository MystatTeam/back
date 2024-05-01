import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

mongoose
    .connect(process.env.DATABASE_URL || "")
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error", err));