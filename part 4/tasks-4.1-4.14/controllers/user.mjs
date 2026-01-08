import express from "express";
import User from "../models/User.mjs";
import {error} from "../utils/logger.mjs";
import bcrypt from "bcryptjs";

export const userRouter = express.Router()

//todo
//post method
//add password check and password length check


userRouter.get('/', async (req, res) => {
	try {
		const users = await User.find({})

		res.status(200).json(users)
	} catch (err) {
		error(err.name)
		res.status(504).end("No such user found")
	}
})

userRouter.post('/', async (req, res) => {
	const {name, username, password} = req.body
	if (!password || password.length < 6) {
		return res.status(400).json({error: "fill in all fields"})
	}

	if (!username || !username.length) {
		return res.status(400).json({error: "fill in all fields"})
	}

	try {
		const passwordHash = await bcrypt.hash(password, 10)
		const user = new User({name, username, passwordHash})
		await user.save()
		res.status(201).json(user)
	} catch (err) {
		error(err.name)
		res.status(400).end("Error creating user")
	}
})
