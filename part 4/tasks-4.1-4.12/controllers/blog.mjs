import express from "express";
import Blog from "../models/blog.mjs";
import {error} from "../utils/logger.mjs";

export const blogRouter = express.Router();

blogRouter.get('/', async(request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body);

	try {
		const addedBlog = await blog.save()
		response.status(201).json(addedBlog)
	} catch (err) {
		error(err.message)
		response.status(400).json({error: err.name})
	}
})
