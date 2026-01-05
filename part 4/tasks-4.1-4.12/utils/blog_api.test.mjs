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

test.only('should return 2 blogs in json format', async () => {
	const res = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	assert.strictEqual(res.status, 200);
	assert.strictEqual(res.body.length, blogsInitial.length);
})

after(async () => {
	await mongoose.connection.close()
})
