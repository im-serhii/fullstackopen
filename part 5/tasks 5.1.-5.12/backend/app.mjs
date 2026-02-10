import express from "express";
import {blogRouter} from "./controllers/blog.mjs";
import {Info, Error} from "./utils/logger.mjs";
import {dbUrl} from "./utils/config.mjs";
import mongoose from "mongoose";
import {userRouter} from "./controllers/user.mjs";
import {errorHandler} from "./middleware/errorHandler.mjs";
import {authRouter} from "./controllers/auth.mjs";
import {tokenExtractor} from "./middleware/tokenExtractor.mjs";

export const app = express()

app.use(express.json())
app.use(tokenExtractor)
app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use(errorHandler)

const dbConnection = async () => {
	try {
		Info('connecting to the database')
		await mongoose.connect(dbUrl, { family: 4 })
		Info('Connected to the database')
	} catch(err) {
		Error(err.message)
	}
}

dbConnection()
