import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'
import Blog from './Blog'

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

test('like button clicked two times and event handler is recived as a prop alos called twice', async () => {
  const blog = {
    title: 'my first blog',
    author: 'serhii',
    url: 'http://localhost',
    likes: 11
  }

  const user = userEvent.setup()
  const likeHandler = vi.fn()

  render(<Blog addLikeHandler={likeHandler} blog={blog} />)

  const showButton = await screen.findByText('show')

  await user.click(showButton)

  const likeButton = await screen.findByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(likeHandler.mock.calls).toHaveLength(2)
})
