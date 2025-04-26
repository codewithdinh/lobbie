import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { Routes, Route } from 'react-router-dom'
import SideBar from './routes/SideBar.jsx'
import Login from './routes/Login.jsx'
import Register from './routes/Register.jsx'
import CreatePost from './routes/CreatePost.jsx'
import ViewPost from './routes/ViewPost.jsx'
import EditPost from './routes/EditPost.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<SideBar />}>
            <Route index={true} element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<ViewPost />} />
            <Route path="/posts/edit/:id" element={<EditPost />} />
            {/* Add more routes as needed */}
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
)
