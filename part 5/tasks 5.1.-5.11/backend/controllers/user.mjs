import express from "express";
import User from "../models/User.mjs";
import { Error } from "../utils/logger.mjs";
import bcrypt from "bcryptjs";

export const userRouter = express.Router()

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
      .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

    res.status(200).json(users)
  } catch (err) {
    Error(err.name)
    res.status(504).end("No such user found")
    next(err)
  }
})

userRouter.post('/', async (req, res, next) => {
  const { name, username, password } = req.body
  if (!password || password.length < 3) {
    return res.status(400).json({ error: "password must be at least 3 characters" })
  }

  if (!username || username.length < 3) {
    return res.status(400).json({ error: "username must be at least 3 characters" })
  }

  try {
    const userNameInDB = await User.findOne({ username: username })
    if (userNameInDB) {
      return res.status(400).json({ error: 'username must be unique' })
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({ name, username, passwordHash })
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})
