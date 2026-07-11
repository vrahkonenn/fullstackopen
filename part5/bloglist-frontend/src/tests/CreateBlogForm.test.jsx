import { render, screen } from '@testing-library/react'
import CreateBlogForm from '../components/CreateBlogForm'
import userEvent from '@testing-library/user-event'

test('<CreateBlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<CreateBlogForm handleCreateBlog={createBlog} />)

  const titleInput = screen.getByLabelText('Title:')
  const authorInput = screen.getByLabelText('Author:')
  const urlInput = screen.getByLabelText('Url:')
  const createButton = screen.getByText('Create')

  await user.type(authorInput, 'Blogin author')
  await user.type(titleInput, 'Blogin title')
  await user.type(urlInput, 'Blogin url')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Blogin title')
  expect(createBlog.mock.calls[0][0].author).toBe('Blogin author')
  expect(createBlog.mock.calls[0][0].url).toBe('Blogin url')
  console.log(createBlog.mock.calls)
})