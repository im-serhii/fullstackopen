import { test, after, beforeEach } from'node:test'
import {app} from "../app.mjs";
import supertest from 'supertest'
import BlogModel from '../models/blog.mjs'
import mongoose from "mongoose";
import assert from "assert";

const api = supertest(app)

const blogsInitial = [
	{
		title: 'First Blog',
		author: 'Author 1',
		url: 'http://link1.com',
		likes: 1
	},
	{
		title: 'Second Blog',
		author: 'Author 2',
		url: 'http://link2.com',
		likes: 2
	}
]

beforeEach(async () => {
	await BlogModel.deleteMany({})
	await BlogModel.insertMany(blogsInitial)
})

test('should return 2 blogs in json format', async () => {
	const res = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	assert.strictEqual(res.status, 200);
	assert.strictEqual(res.body.length, blogsInitial.length);
})

test('should return correct blog\'s id', async () => {
	const res = await api
		.get('/api/blogs')

	res.body.forEach(blog => {
		assert.ok(blog.id)
		assert.strictEqual( blog._id, undefined )
	})
})

test('should return correctly created blog, increase blog length by 1', async () => {
	const blog = blogsInitial[0]

	await api
		.post('/api/blogs')
		.send(blog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const res = await api.get('/api/blogs')

	const addedBlog = res.body[res.body.length - 1]

	assert.strictEqual(blogsInitial.length + 1, res.body.length)

	assert.strictEqual(blog.title, addedBlog.title)
	assert.strictEqual(blog.author, addedBlog.author)
	assert.strictEqual(blog.url, addedBlog.url)
	assert.strictEqual(blog.likes, addedBlog.likes)
})

test('should put 0 to the like prop if user did not put it into request', async () => {
	const blog = {
		title: 'First Blog test length',
		author: 'Author 1',
		url: 'http://link1.com',
	}

	await api
		.post('/api/blogs')
	  .send(blog)
		.expect(201)
	  .expect('Content-Type', /application\/json/)

	const res = await api
		.get('/api/blogs')

	assert.strictEqual(res.body[res.body.length - 1].likes, 0);
})

test.only('should return status code 400 if title or ulr is missing in request', async () => {
	const blogs = [
		{
			author: 'Author 1',
			url: 'http://link1.com',
		},
		{
			title: 'First Blog test length',
			author: 'Author 1',
		}
	]

	await api
	.post('/api/blogs')
	.send(blogs[0])
	.expect(400)

	await api
		.post('/api/blogs')
	.send(blogs[1])
	.expect(400)
})

after(async () => {
	await mongoose.connection.close()
})
