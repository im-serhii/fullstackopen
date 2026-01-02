import {test, describe} from 'node:test'
import assert from 'assert'
import {dummy, totalLikes } from "../utils/blogListHelper.mjs";

describe('blog list', () => {
	test('should return 1', () => {
		const blogList = []

		const result = dummy(blogList)
		assert.strictEqual(result, 1)
	})
})

describe('total likes per blog post', () => {
	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
			likes: 5,
			__v: 0
		}
	]

	test('should return 5', () => {
		const result = totalLikes(listWithOneBlog)
		assert.strictEqual(result, 5)
	})
})
