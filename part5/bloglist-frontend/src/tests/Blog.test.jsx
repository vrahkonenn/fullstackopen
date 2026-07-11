import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import { expect } from 'vitest'

describe('<Blog />', () => {
  test('renders title and author', () => {
    const blog = {
      title: 'testiblogi',
      author: 'testaaja',
      url: 'testiurl'
    }

    render(<Blog blog={blog} />)
    
    const element = screen.getByText(`testiblogi by testaaja`)
    expect(element).toBeDefined()
  })

  test('By default does not render url and likes', () => {
    const blog = {
      title: 'testiblogi',
      author: 'testaaja',
      url: 'testiurl'
    }

    render(<Blog blog={blog} />)
    
    const url = screen.queryByText(`testiurl`)
    const likes = screen.queryByText('likes: ')

    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('After clicking "Show", url, likes and user is rendered', async () => {
    const loggedUser = {
      id: 'userId'
    }

    const blog = {
      title: 'testiblogi',
      author: 'testaaja',
      url: 'testiurl',
      likes: 5,
      user: [{username: 'testUsername', id: 'userId'}]
    }
    
    render(<Blog blog={blog} user={loggedUser} />)

    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const url = screen.getByText(`testiurl`)
    const likes = screen.getByText('likes: 5')
    const userId = screen.getByText('testUsername')
  })

  test('After clicking "like" twice, mockhandler is called twice ', async () => {
    const loggedUser = {
      id: 'userId'
    }

    const blog = {
      title: 'testiblogi',
      author: 'testaaja',
      url: 'testiurl',
      likes: 5,
      user: [{username: 'testUsername', id: 'userId'}]
    }

    const mockHandler = vi.fn()

    
    render(<Blog blog={blog} handleLike={mockHandler} user={loggedUser}/>)
    
    const user = userEvent.setup()
    const showButton = screen.getByText('Show')
    await user.click(showButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})