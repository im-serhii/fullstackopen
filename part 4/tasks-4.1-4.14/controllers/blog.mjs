import express from "express";
import Blog from "../models/blog.mjs";
import {error} from "../utils/logger.mjs";
import mongoose from "mongoose";

export const blogRouter = express.Router();

blogRouter.get('/', async(request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body);

	try {
		const addedBlog = await blog.save()
		response.status(201).json(addedBlog).end()
	} catch (err) {
		error(err.message)
		response.status(400).json({error: err.name})
	}
})

blogRouter.delete('/:id', async (request, response) => {
	try {
		await Blog.findByIdAndDelete(request.params.id)
		response.status(204).end()
	} catch (err) {
		error(err.message)
		response.status(400).json({error: err.name})
	}
})

blogRouter.put('/:id', async (request, response) => {
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
		error(err.message)
		response.status(400).json({error: err.name})
	}
})
