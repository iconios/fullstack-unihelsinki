import { useState } from 'react'
import showNotification from '../services/notification'
import propTypes from 'prop-types'


CreateBlog.propTypes = {
  handleCreate: propTypes.func.isRequired
}

function CreateBlog({ handleCreate }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  function handleTitle(e) {
    setTitle(e.target.value)
  }

  function handleAuthor(e) {
    setAuthor(e.target.value)
  }

  function handleUrl(e) {
    setUrl(e.target.value)
  }

  function validate(e) {
    e.preventDefault()
    if(title && author && url) {
      const newBlog = {
        'title': String(title),
        'author': String(author),
        'url': String(url)
      }
      handleCreate(newBlog)
      setAuthor('')
      setTitle('')
      setUrl('')
    }
    else {
      showNotification('None of the fields can be empty', 'error')
    }
  }

  return (
    <form onSubmit={validate}>
      <div>
        <h2>Create New</h2>
        <label>Title: <input type="text" data-testid="title" name="title" value={title} onChange={handleTitle}></input></label>
        <br />
        <label>Author: <input type="text" data-testid="author" name="author" value={author} onChange={handleAuthor}></input></label>
        <br />
        <label>Url: <input type="text" data-testid="url" name="url" value={url} onChange={handleUrl}></input></label>
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateBlog