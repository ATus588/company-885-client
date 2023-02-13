import './Css/App.css'
import './Css/Login.css'
import './Css/News.css'
import './Css/Profile.css'
import './Css/Admin.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useContext } from 'react'
import { AuthContext } from './context/auth'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import LoginToken from './pages/LoginToken'
import SharedLayout from './pages/SharedLayout'
import News from './pages/News'
import NotFound from './pages/NotFound'
import LoginAdmin from './pages/LoginAdmin'
import ForgotPass from './pages/ForgotPass'
import Profile from './pages/Profile'
import SingleNews from './pages/SingleNews'
import AddNews from './pages/AddNews'
import Users from './pages/Users'
import Admins from './pages/Admins'



function App() {
  const { user } = useContext(AuthContext)


  return (
    <BrowserRouter>
      <Routes>
        <Route path='login/user' element={<Login />} />
        <Route path='login/admin' element={<LoginAdmin />} />
        <Route path='register' element={<Register />} />
        <Route path='forgotpass/user' element={<ForgotPass />} />
        <Route path='forgotpass/admin' element={<ForgotPass />} />
        <Route path='login/token' element={<LoginToken />} />

        <Route path='/' element={<SharedLayout />} >
          <Route index element={user ? <Profile /> : <Home />} />
          <Route path='admins' element={<Admins />} />
          <Route path='users' element={<Users />} />
          <Route path='news' element={<News />} />
          <Route path='news/:newsId' element={<SingleNews />} />
          <Route path='news/add' element={<AddNews />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
