import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import NewBlogForm from './NewBlogForm'

test('from calls event handler as a prop with correct values', async () => {
  const blog = {
    title: 'my first blog',
    author: 'serhii',
    url: 'http://localhost',
    likes: 11
  }

  const handleBlog = vi.fn()
  const user = userEvent.setup()

  render(<NewBlogForm handleBlog={handleBlog} />)

  const titleInput = await screen.findByLabelText('title:')
  const authorInput = await screen.findByLabelText('author:')
  const urlInput = await screen.findByLabelText('url:')

  const submitButton = await screen.findByDisplayValue('create')

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)
  await user.click(submitButton)

  expect(handleBlog).toHaveBeenCalledTimes(1)
  expect(handleBlog).toHaveBeenCalledWith({
    title: blog.title,
    author: blog.author,
    url: blog.url
  })
})
