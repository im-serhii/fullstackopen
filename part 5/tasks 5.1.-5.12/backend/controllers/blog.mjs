import express from "express";
import Blog from "../models/blog.mjs";
import { userExtractor } from "../middleware/userExtractor.mjs";
export const blogRouter = express.Router();

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
    response.json(blogs)
  } catch (err) {
    next(err)
  }
})

blogRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    const user = request.user

    if (!user) {
      return response.status(401).json({ error: "token missing or invalid" })
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

    const populatedBlog = await Blog.findById(addedBlog._id)
      .populate('user', { name: 1, username: 1 })

    response.status(201).json(populatedBlog)
  } catch (err) {
    next(err)
  }
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const user = request.user

    if (!user) {
      return response.status(401).json({ error: "token missing or invalid" })
    }

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: "blog does not exist" })
    }

    if (user.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    } else {
      return response.status(401).json({ error: "something went wrong" })
    }

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
    }).populate('user', { name: 1, username: 1 })
    if (updatedBlog) {
      response.status(200).json(updatedBlog)
    } else {
      response.status(404).end()
    }


  } catch (err) {
    next(err)
  }
})
