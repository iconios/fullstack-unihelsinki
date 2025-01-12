import { useState } from 'react'
import blogService from '../services/blogs'
import showNotification from '../services/notification'
import propTypes from 'prop-types'

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  loggedInUser: propTypes.string.isRequired,
}

function Blog ({ blog, loggedInUser }) {
  const [isView, setIsView] = useState(false)
  const [showBrief, setShowBrief] = useState(false)
  const [upBlog, setUpBlog] = useState(blog)
  const blogStyle = {
    fontSize: 18,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    borderColor: 'gray',
  }

  const deleteButtonStyle = {
    backgroundColor: 'skyblue',
    padding: 2,
    borderColor: 'skyblue',
  }

  function handleClick() {
    setIsView(!isView)
    setShowBrief(!showBrief)
  }

  function handleLikes() {
    //increase the likes + 1
    const updatedBlog = {
      ...upBlog,
      'likes': upBlog.likes + 1
    }
    console.log('Updated Blog ID Before', updatedBlog.id)
    // delete the ID from the updated blog
    delete updatedBlog.id
    console.log('Updated Blog after ID deletion', updatedBlog)
    console.log('Received Blog', blog)
    //Reformat the user data in the updated blog
    updatedBlog.user = updatedBlog.user.id
    console.log('Updated Blog after user data reformat', updatedBlog)
    //Send updated blog item to the server
    blogService.update(blog.id, updatedBlog).then(result => {
      console.log('Response from server', result)
      setUpBlog(result)
      console.log('Updated blog', upBlog)
    })
      .catch(error => {
        console.log('Error from server', error)
      })
  }

  // Handle blog deletion
  function handleDelete() {
    if(window.confirm('Are you sure you want to delete?')) {
      blogService.remove(blog.id).then(result => {
        console.log('Response from server', result)
        showNotification('Deletion successful', 'valid')
        setTimeout(() => {
          location.reload()
        }, 5000)
      })
        .catch(error => {
          console.log('Error from server', error)
          showNotification(error, 'error')
        })
    }
  }

  // Handler to show remove button
  function showRemoveButton(){
    if(loggedInUser === blog.user.username) {
      return <button type="button" onClick={handleDelete} style={deleteButtonStyle}>Remove</button>
    }
  }

  const FullBlog = () => {
    return (
      <div style={blogStyle}>
        {upBlog.title} {upBlog.author} <button type="button" onClick={handleClick}>{isView ? 'hide' : 'view'} </button>
        <br />
        {upBlog.url}
        <br />
        {upBlog.likes} <button type="button" onClick={handleLikes}>likes</button>
        <br />
        {blog.user.name}
        <br />
        {showRemoveButton()}
      </div>
    )
  }

  const BriefBlog = () => {
    return (
      <div style={blogStyle}>
        {upBlog.title} {upBlog.author} <button type="button" onClick={handleClick}>{isView ? 'hide' : 'view'} </button>
      </div>
    )
  }

  return (
    <>
      { showBrief ? FullBlog() : BriefBlog() }
    </>
  )
}

export default Blog