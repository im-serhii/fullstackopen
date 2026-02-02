import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import UserForm from "./components/UserForm.jsx";
import {login} from "./services/login.js";
import NewBlogForm from "./components/NewBlogForm.jsx";
import Notification from "./components/Notification/Notification.jsx";
import Toggle from "./components/Toggle.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [notificationData, setNotificationData] = useState(null)

  const addBlogFormRef = useRef()

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

  const handleNotification = (type, data) => {
    setNotificationType(type)
    setNotificationData(data)

    setTimeout(() => {
      setNotificationType(null)
      setNotificationData(null)
    }, 2500)
  }

  const handleLogin = async userData => {
    try {
      const { username, password } = userData
      const user = await login({username, password})

      window.localStorage.setItem('user', JSON.stringify(user))

      setUser(user)

      blogService.setToken(user.token)
    } catch (error) {
      handleNotification('error', error.name)
      console.log(error)
    }
  }

  const handleAddBlog = async data => {
    const addedBlog = await blogService.addBlog(data)
    setBlogs([...blogs, addedBlog])
    addBlogFormRef.current.toggle()
    handleNotification('success', addedBlog.title)
  }

  return (
    <div>
      <Notification type={notificationType} data={notificationData} />
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
          <Toggle ref={addBlogFormRef} label={"create new blog blog"} >
            <NewBlogForm handleBlog={handleAddBlog} />
          </Toggle>
          <hr/>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </>
      }
    </div>
  )
}

export default App
