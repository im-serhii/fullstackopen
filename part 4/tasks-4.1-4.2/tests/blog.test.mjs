import {test} from 'node:test'
import assert from 'assert'
import {dummy}  from "../utils/blogListHelper.mjs";

test('should return 1', () => {
	const blogList = []

	const result = dummy(blogList)
	assert.strictEqual(result, 1)
})
