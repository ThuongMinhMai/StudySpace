import { Route, Routes } from 'react-router-dom'
import HomePage from './components/global/templates/HomePage'
import RoomPage from './components/global/templates/RoomPage'
import RootLayout from './components/global/templates/RootLayout'
import NotFound from './components/global/organisms/NotFound'
import SearchPage from './components/global/organisms/SearchPage'
import { useState } from 'react'
import Detail from './components/global/organisms/Detail'

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen(prev => !prev);

  return (
    <Routes>
      {/* Pass isSearchOpen and toggleSearch as props to HomePage */}
      <Route path='/' element={<HomePage isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />} />
      <Route element={<RootLayout isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />}>
        <Route path='/room' element={<RoomPage />} />
        <Route path='/detail' element={<Detail />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
