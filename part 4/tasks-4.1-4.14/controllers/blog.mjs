import express from "express";
import Blog from "../models/blog.mjs";
import User from "../models/user.mjs";
export const blogRouter = express.Router();

blogRouter.get('/', async(request, response, next) => {
	try {
		const blogs = await Blog.find({}).populate('user', {name: 1, username: 1})
		response.json(blogs)
	} catch (err) {
		next(err)
	}
})

blogRouter.post('/', async (request, response, next) => {
	const body = request.body
	const user = await User.findOne({})

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

	try {
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
