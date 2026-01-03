export const dummy = (bloglist) => {
	return 1
}

export const totalLikes = (bloglist) => {
	return bloglist.reduce((likes, blog) => likes + blog.likes, 0)
}

export const favoriteBlog = (bloglist) => {
	let favoriteBlog = bloglist.length > 0 ? bloglist[0] : null

	bloglist.forEach(blog => {
		if (blog.likes > favoriteBlog.likes) {
			favoriteBlog = blog
		}
	})

	return favoriteBlog
}

export const mostBlogs = (bloglist) => {
	if (bloglist.length === 0) return null

	const counts = bloglist.reduce((acc, blog) => {
		const author = blog.author
		acc[author] = (acc[author] || 0) + 1
		return acc
	}, {})

	const authors = Object.keys(counts)

	const topAuthor = authors.reduce((maxAuthor, currentAuthor) => {
		return counts[currentAuthor] > counts[maxAuthor] ? currentAuthor : maxAuthor
	})

	return {
		author: topAuthor,
		blogs: counts[topAuthor]
	}
}
