import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import NavBar from './components/NavBar'
import NotFound from './components/NotFound'
import Cart from './components/Cart'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/not-found' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
