import express from "express";
import {blogRouter} from "./controllers/blog.mjs";
import {dbUrl} from "./utils/config.mjs";
import {error, info} from "./utils/logger.mjs";
import mongoose from "mongoose";

export const app = express()

app.use(express.json())
app.use("/api/blogs", blogRouter)

info('connecting to the database')
mongoose.connect(dbUrl, { family: 4 })
	.then(() => info('Connected to the database'))
	.catch((err) => error(err.message));
