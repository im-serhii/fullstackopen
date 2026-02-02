const Blog = ({ blog }) => (
  <div>
    <h1>
      {blog.title}
    </h1>
    <p>
      {blog.author}
      <br/>
      <a href={blog.url}>{blog.url}</a>
    </p>
    {blog.likes} likes
  </div>  
)

export default Blog
