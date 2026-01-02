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
