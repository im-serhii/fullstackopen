import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import UserForm from "./components/UserForm.jsx";
import {login} from "./services/login.js";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userInLocalStorage = localStorage.getItem("user");
    if (userInLocalStorage) {
      const user = JSON.parse(userInLocalStorage)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async userData => {
    try {
      const { username, password } = userData
      const user = await login({username, password})

      window.localStorage.setItem('user', JSON.stringify(user))

      setUser(user)

      blogService.setToken(user.token)
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
            <button
              onClick={() => {
                localStorage.removeItem('user')
                setUser(null)
              }}
            >log out</button>
          </div>
          <hr/>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </>
      }
    </div>
  )
}

export default App
