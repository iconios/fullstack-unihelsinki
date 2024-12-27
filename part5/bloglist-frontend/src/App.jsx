import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'
import { v4 as uuidv4 } from 'uuid'
import showNotification from './services/notification'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [createBlog, setCreateBlog] = useState(false)

  useEffect(() => {
    async function getAll(){
      try {
        const result = await blogService.getAll()
        setBlogs( result )
      }
      catch(error) {
        console.log('Error getting blogs', error)
      }
    }
    getAll()
  }, [blogService])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInAuth')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('Logged User JSON', user.token)
    }
  }, [])
  
  function handleCreate(newBlog) {
    blogService.create(newBlog).then(result => {
      const updatedBlog = [
        ...blogs,
        {"title": result.title,
          "author": result.author,
          "url": result.url,
          "likes": result.likes,
          "user": result.user,
          "id": result.id
        }
      ]
      console.log('Result from create blog', result)
      setBlogs(updatedBlog)
      showNotification(`A new blog ${result.title} by ${result.author} added`, "valid")
      setCreateBlog(false)
      location.reload()
    })
  }

  async function handleLoginSubmit(e) {
    e.preventDefault()
    if (username && password) {
      console.log('Received username and password', username, password)
      try {
        const response = await loginService.logIn({username, password})
        console.log('Received from server', response)  
        if(response) {
          setUser(response)      
          blogService.setToken(response.token)     
          console.log('Received token from server', response.token)
          window.localStorage.setItem('loggedInAuth', JSON.stringify(response))
          console.log('Token in browser', window.localStorage.getItem('loggedInAuth')) 
        } 
        else {
          setUsername('')
          setPassword('')
        }
      }
      catch (error) {
        setUsername('')
        setPassword('')
        console.log('Error received', error)
      }
    }
  }

  function handleLogoutSubmit(e) {
    e.preventDefault()
    window.localStorage.clear()
    location.reload()
    setUser('')
  }

  function handleNewBlogClick() {
    setCreateBlog(true)
    console.log('State of create blog variable', createBlog)
  }

  function newBlogButton(onClick) {
    return <button type="button" onClick={onClick}>Creeate new blog</button>
  }

  function newBlogForm(onClick) {
    return (
      <div>
        <CreateBlog handleCreate={onClick} />
        <button type="button" onClick={()=> setCreateBlog(false) }>Cancel</button>
      </div>
    )
  }

  

  function blogForm() {
    return (
      <div>
        <h1>Blogs</h1>
        <p>{user.name} logged-in <span><button type="submit" onClick={handleLogoutSubmit}>Logout</button></span></p>
        { createBlog ? newBlogForm(handleCreate) : newBlogButton(handleNewBlogClick) }
        {console.log('Received blogs', blogs)}
        { blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={uuidv4()} blog={blog} loggedInUser={user.username} />
        )}
      </div>
    )
  }

  function loginForm() {
    return (
      <form onSubmit={handleLoginSubmit}>
        <div>
          <h1>Log into Application</h1>
          <label>Username: <input type="text"  autoComplete='username' value={username} onChange={(e) => setUsername(e.target.value)}></input></label>
          <br />
          <label>Password: <input type="password" autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)}></input></label>
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    )
  }

  return (
    <>
      { user === null ? loginForm() : blogForm() }
    </>
  )
}

export default App