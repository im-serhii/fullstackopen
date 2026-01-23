import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from "../models/user.mjs";
import {secret} from "../utils/config.mjs";

export const authRouter = express.Router()

authRouter.post('/', async (request, response, next) => {
	try {
		const { username, password } = request.body

		const user = await User.findOne({ username })

		const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

		if(!(user && passwordCorrect)) {
			return response.status(401).json({error: 'Invalid Credentials'})
		}

		const userToken = {
			username: user.username,
			id: user._id,
		}

		const token = jwt.sign(userToken, secret)

		return response.status(200).send({
			token, username: user.username, name: user.name
		})
	} catch (err) {
		next(err)
	}
})
