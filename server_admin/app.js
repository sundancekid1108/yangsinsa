import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import dbConnect from './database/config.js';
import keys from "./config/keys/keys.js";
import router from "./router/router.js";

dotenv.config();

const PORT = keys.port

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.listen(PORT, () => {
    console.log(`Admin Server start Listening on port ${PORT}. Check http://localhost:${PORT}/ `
    );
});

app.use(router)

dbConnect()