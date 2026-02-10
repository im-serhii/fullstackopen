import { useState } from 'react'

const Blog = ({ blog, addLikeHandler, deleteBlogHandler, username }) => {
  const [show, setShow] = useState(false)

  const toggle = () => {
    setShow(!show)
  }

  const likeHandler = () => {
    addLikeHandler(blog)
  }

  const deleteHandler = () => {
    if (window.confirm(`Remove blog ${blog.title} by author ${blog.author}`)) {
      deleteBlogHandler(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <span>
        {blog.title} {blog.author} <button onClick={toggle}>{show ? 'hide' : 'show'}</button>
      </span>
      <div style={{ display: show ? '' : 'none' }}>
        <a href={blog.url}>{blog.url}</a>
        <br/>
        {blog.likes} likes <button onClick={() => likeHandler()}>likes</button>
        {username === blog?.user?.username && <> <br /> <button onClick={() => deleteHandler()}>delete blog</button>  </>}
      </div>
    </div>
  )
}
export default Blog
