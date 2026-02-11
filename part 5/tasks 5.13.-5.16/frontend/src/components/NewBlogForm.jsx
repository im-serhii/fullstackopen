import { useState } from 'react'

const NewBlogForm = ({ handleBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    handleBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>create new</h1>
      <label>
        title: <input value={title} onChange={({ target }) => setTitle(target.value)} type='text' />
      </label>
      <br />
      <label>
        author:{' '}
        <input value={author} onChange={({ target }) => setAuthor(target.value)} type='text' />
      </label>
      <br />
      <label>
        url: <input value={url} onChange={({ target }) => setUrl(target.value)} type='text' />
      </label>
      <br />
      <input value='create' type='submit' />
    </form>
  )
}
export default NewBlogForm
