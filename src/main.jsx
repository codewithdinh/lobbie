import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SideBar from './routes/SideBar.jsx'
import Login from './routes/Login.jsx'
import Register from './routes/Register.jsx'
import CreateNewPost from './routes/CreateNewPost.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SideBar />}>
          <Route index={true} element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createnewpost" element={<CreateNewPost />} />
          <Route path="/register" element={<Register />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
