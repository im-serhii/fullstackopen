import {describe, test} from 'node:test'
import assert from 'assert'
import {dummy, favoriteBlog, mostBlogs, mostLikes, totalLikes} from "../utils/blogListHelper.mjs";

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

describe('find favorite blog', () => {
	test('should return 12', () => {
		const result = favoriteBlog(blogs)
		assert.deepStrictEqual(
			result,
			{
				_id: "5a422b3a1b54a676234d17f9",
				title: "Canonical string reduction",
				author: "Edsger W. Dijkstra",
				url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
				likes: 12,
				__v: 0
			}
		)
	})
})

describe('returns the author who has the largest amount of blogs', () => {
	test('should return Robert C. Martin, 3', () => {
		const result = mostBlogs(blogs)
		assert.deepStrictEqual(
			result,
			{
				author: "Robert C. Martin",
				blogs: 3
			}
		)
	})
})

describe('returns the author who has the largest amount of likes', () => {
	test('should return Edsger W. Dijkstra, 17', () => {
		const result = mostLikes(blogs)
		assert.deepStrictEqual(
			result,
			{
				author: "Edsger W. Dijkstra",
				likes: 17
			}
		)
	})
})
