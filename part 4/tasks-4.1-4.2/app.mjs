import express from "express";
import {blogRouter} from "./controllers/blog.mjs";

export const app = express()

app.use(express.json())
app.use("/api/blogs", blogRouter)
