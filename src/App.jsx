import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import Analitycs from './pages/Analitycs'
import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
import { useState } from 'react'

function App() {

  const [user, setUser] = useState(null)

  const login = () =>{
    // request Done

    setUser({
      id:1,
      name: 'jhon',
      permissions: ['']
    })
  }

  const logout = () => setUser(null)

  return (
    <Router>
      <Navigation/>

      {
        user ? (
          <button onClick={logout}>Logout</button>

        ): (
          <button  onClick={login}>Login</button>

        )
      }

      <Routes>
        <Route index element={<Home/>} />

        <Route element={<ProtectedRoute isAllowed={!!user}/>}>

          <Route path='/landing' element={<Landing/>} />
          <Route path='/profile' element={<Profile/>} />

        </Route>

        <Route path='/analitycs' 
        element={ <ProtectedRoute isAllowed={!!user && user.permissions.includes('analize')} redirectTo='/profile'>
          <Analitycs/>
        </ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
