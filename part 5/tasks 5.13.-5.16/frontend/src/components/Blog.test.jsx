import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

test('by default, renders only title and author', async () => {
  const blog = {
    title: 'my first blog',
    author: 'serhii',
    url: 'http://localhost',
    likes: 11
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText(blog.title, { exact: false })
  const author = screen.getByText(blog.author, { exact: false })
  const url = screen.getByText(blog.url, { exact: false })
  const likes = screen.getByText(blog.likes, { exact: false })

  expect(title).toBeVisible()
  expect(author).toBeVisible()
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
})

test('url and likes are visible when button clicked', async () => {
  const blog = {
    title: 'my first blog',
    author: 'serhii',
    url: 'http://localhost',
    likes: 11
  }

  const user = userEvent.setup()
  render(<Blog blog={blog} />)

  const button = screen.getByText('show')

  await user.click(button)

  const url = screen.getByText(blog.url, { exact: false })
  const likes = screen.getByText(blog.likes, { exact: false })

  expect(url).toBeVisible()
  expect(likes).toBeVisible()
})
