import express from "express";
import Blog from "../models/blog.mjs";
import User from "../models/user.mjs";
import jwt from "jsonwebtoken";
import {secret} from "../utils/config.mjs";
export const blogRouter = express.Router();

const getTokenFrom = request => {
	const authorization = request.get("authorization")
	if (authorization && authorization.startsWith("Bearer ")) {
		return authorization.replace("Bearer ", "");
	}

	return null
}

blogRouter.get('/', async(request, response, next) => {
	try {
		const blogs = await Blog.find({}).populate('user', {name: 1, username: 1})
		response.json(blogs)
	} catch (err) {
		next(err)
	}
})

blogRouter.post('/', async (request, response, next) => {
	try {
		const body = request.body

		const decodedToken = jwt.verify(getTokenFrom(request), secret)
		if (!decodedToken.id) {
			return response.status(401).json({error: "token invalid"})
		}

		const user = await User.findById(decodedToken.id)

		if (!user) {
			return response.status(400).json({error: "User does not exist"})
		}

		const blog = new Blog({
			user: user.id,
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
		})

		const addedBlog = await blog.save()
		user.blogs = user.blogs.concat(addedBlog._id)
		await user.save()
		response.status(201).json(addedBlog)
	} catch (err) {
		next(err)
	}
})

blogRouter.delete('/:id', async (request, response, next) => {
	try {
		await Blog.findByIdAndDelete(request.params.id)
		response.status(204).end()
	} catch (err) {
		next(err)
	}
})

blogRouter.put('/:id', async (request, response, next) => {
	try {
		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
			new: true,
			runValidators: true,
			context: 'query'
		})
		if (updatedBlog) {
			response.status(200).json(updatedBlog)
		} else {
			response.status(404).end()
		}


	} catch (err) {
		next(err)
	}
})
