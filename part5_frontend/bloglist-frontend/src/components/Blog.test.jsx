import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogsForm from './BlogsForm'
import { mockComponent } from 'react-dom/test-utils'
import { beforeEach } from 'vitest'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'Component testing Blog',
      author: 'unkown',
      url: 'http://testing',
      likes: 0,
      user: { username: 'root' },
    }
    container = render(<Blog blog={blog} />).container
  })

  test('Only render default content', async () => {
    await screen.findByText('Component testing Blog unkown')

    const div = container.querySelector('.showDetail')
    expect(div).toHaveStyle('display: none')

    const element = screen.queryByText('http://testing')
    expect(element).toBeNull()
  })

  test('When click view button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.showDetail')
    console.log('BITCH! :', div.innerHTML)

    await screen.findByText(/http:\/\/testing/)
    await screen.findByText(/0/)
  })
})

test('When like button twice', async () => {
  const blog = {
    title: 'Component testing Blog',
    author: 'unkown',
    url: 'http://testing',
    likes: 0,
    user: { username: 'root' },
  }

  const mockHandler = vi.fn()

  const container = render(
    <Blog blog={blog} putLikes={mockHandler} />,
  ).container
  let button

  const user = userEvent.setup()
  button = screen.getByText('view')
  await user.click(button)

  button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

describe('blogForm testing...', () => {
  test('blogForm: ', async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn()

    render(<BlogsForm createBlog={mockHandler} />)

    const inputTitle = screen.getByPlaceholderText('put title here')
    const inputAuthor = screen.getByPlaceholderText('put author here')
    const button = screen.getByText('create')

    await user.type(inputTitle, 'testing a form...')
    await user.type(inputAuthor, 'ME!')
    await user.click(button)

    console.log('AAAAAAAA', mockHandler.mock.calls)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('testing a form...')
    expect(mockHandler.mock.calls[0][0].author).toBe('ME!')
  })
})
