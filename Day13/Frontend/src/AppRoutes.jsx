import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Feed from './features/auth/posts/Feed'
import CreatePost from './features/auth/pages/CreatePost'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

function AppRoutes(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create-post' element={<CreatePost />} />
      
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes