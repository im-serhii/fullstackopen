export const dummy = (bloglist) => {
	return 1
}

export const totalLikes = (bloglist) => {
	return bloglist.reduce((likes, blog) => likes + blog.likes, 0)
}
