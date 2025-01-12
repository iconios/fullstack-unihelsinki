import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

const blog = {
  'title': 'Sounds of Grace',
  'author': 'Muyiwa Ikotun',
  'url': 'https://www.muyiwaikotun.org',
  'likes': 12100,
  'user': {
    'name': 'Muyiwa Ikotun'
  }
}

const loggedInUser = 'muyiwa@hotmail.com'

test('Check for the blog title and author', async () => {

  // Render the Blog component to the screen
  render(<Blog blog={blog} loggedInUser={loggedInUser} />)

  const blogTitle = await screen.findByText(/sounds/i)
  const blogAuthor = await screen.findByText(/muyiwa/i)

  expect(blogTitle).not.toBeNull()
  expect(blogAuthor).not.toBeNull()
})

test('Check that blog URL and number of likes display when view button is clicked', async () => {

  // Render the Blog component to the screen
  render(<Blog blog={blog} loggedInUser={loggedInUser} />)

  // Setup the user event
  const user = userEvent.setup()

  // Get the button
  const button = screen.getByRole('button')

  // Simulate the click event for the button
  await user.click(button)

  //Get elements on the screen
  const blogUrl = screen.queryByText(/https/i)
  const blogLikes = screen.queryByText(/\d|\d\d|\d\d\d|\d\d\d\d|\d\d\d\d\d/)

  //Expectations
  expect(blogUrl).not.toBeNull()
  expect(blogLikes).not.toBeNull()

})

test('Check if Like button is clicked 2ce, event handler is called 2ce', async () => {
  // Render the Blog component to the screen
  render(<Blog blog={blog} loggedInUser={loggedInUser} />)

  // Setup the user event
  const user = userEvent.setup()

  // Get the button
  const button = screen.getByRole('button')

  // Simulate the click event for the button
  await user.click(button)

  // Setup mockhandler the event handler
  const mockHandler = vi.fn()

  // Get the like button and attach a mock button
  const likeButton = screen.getByRole('button', { name: 'likes' })
  screen.$on(likeButton, mockHandler)

  // Perform click event on the button
  await user.click(likeButton)

  // Expectations
  expect(mockHandler).toHaveBeenCalledOnce()
})