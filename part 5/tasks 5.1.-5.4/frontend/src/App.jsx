import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import UserForm from "./components/UserForm.jsx";
import {login} from "./services/login.js";
import blog from "./components/Blog";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async userData => {
    try {
      const { username, password } = userData
      const user = await login({username, password})
      blog.setToken(user.token)
      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {!user && <UserForm handleLogin={handleLogin} />}
      {user &&
        <>
          <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
          </div>
          <hr/>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </>
      }
    </div>
  )
}

export default App
