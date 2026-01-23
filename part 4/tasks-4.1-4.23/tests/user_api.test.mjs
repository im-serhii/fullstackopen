import {test, after, beforeEach, describe} from 'node:test'
import {app} from "../app.mjs";
import supertest from 'supertest'
import UserModel from '../models/user.mjs'
import mongoose from "mongoose";
import assert from "assert";

const api = supertest(app)

const initialUsers = [
	{
		username: "john",
		name: "John",
		password: "password",
	},
	{
		username: "Sarah",
		name: "Sarah",
		password: "password",
	}
]

beforeEach(async () => {
	await UserModel.deleteMany({})
	await UserModel.insertMany(initialUsers)
})

describe('user account tests', () => {
	test.only('should return an error if password is les then 3 chars', async () => {
		const user = {
			username: "johndoe",
			password: "pa",
			name: "John",
		}

		const beforePost = await api
			.get('/api/users')

		const res = await api
			.post('/api/users')
			.send(user)
			.expect(400)

		const afterPost = await api
			.get('/api/users')

		assert.strictEqual(beforePost.body.length, afterPost.body.length)
		assert.strictEqual(res.body.error, 'password must be at least 3 characters')
	})

	test('should return an error if username is les then 3 chars', async () => {
		const user = {
			username: "jo",
			password: "password",
			name: "John",
		}

		const beforePost = await api
			.get('/api/users')

		const res = await api
			.post('/api/users')
			.send(user)
			.expect(400)

		const afterPost = await api
			.get('/api/users')

		assert.strictEqual(beforePost.body.length, afterPost.body.length)
		assert.strictEqual(res.body.error, 'username must be at least 3 characters')
	})

	test('should return an error if there is a user with the same username', async () => {
		const beforePost = await api
			.get('/api/users')

		await api
		.post('/api/users')
			.send(initialUsers[0])
			.expect(400)

		const afterPost = await api
			.get('/api/users')

		assert.strictEqual(beforePost.body.length, afterPost.body.length)
	})

	test('should return new user', async () => {
		const user = {
			username: "serhii",
			name: "Serhii",
			password: "password",
		}

		await api
		.post('/api/users')
		.send(user)
		.expect(201)

		const userInDb = await UserModel.findOne({username: user.username})

		assert.strictEqual(user.username, userInDb.username)
		assert.strictEqual(user.name, userInDb.name)
	})
})

after(async () => {
	await mongoose.connection.close()
})
