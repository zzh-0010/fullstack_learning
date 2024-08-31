/*
目前App的功能非常有限，且存在很多问题，包括：
·删除博客时无法一同将其所有的评论删去
·还没实现通知样式根据不同类型的通知改变的功能
·因为token过期等问题导致登陆失效后，页面没有及时刷新！
·不存在blog或者user之类的，页面应该显示什么！现在数据库里没内容的话都无法添加内容，只能从后端添加来让前端正常显示
·prettier的自动分段代码咋用啊，你看上面那一条那么长
·命名混乱，单数复数的慢慢立下一个使用习惯吧，然后组件命名也很混乱，成为下一个问题的部分原因
·组件分离逻辑混乱，甚至一个组件需要传进来一堆变量，如何改变这种情况？还是不需要改变？
·eslint（prettier）的使用方法？后端和前端代码的通用风格完全不同惹
·测试文件还没及时更新
*/

import { useEffect } from 'react'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loginReducer'
import { initializeBlog } from './reducers/blogReducer'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'

let ifError = false

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlog())
  }, [dispatch])

  //检查本地登录信息存储
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('what is happending here',Object.keys(window.localStorage))
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      console.log('The user now is: ', user)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.users)

  if(blogs.length === 0){
    return <div className='container'>There is not any blog yet, wait for rendering or creat one</div>
  }
  return <div className='container'>{user === null ? <LoginForm ifError={ifError}/> : <Blogs ifError={ifError}/>}</div>
}

export default App
