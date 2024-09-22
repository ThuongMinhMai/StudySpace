import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Detail from './components/global/organisms/Detail'
import NotFound from './components/global/organisms/NotFound'
import HomePage from './components/global/templates/HomePage'
import RoomPage from './components/global/templates/RoomPage'
import RootLayout from './components/global/templates/RootLayout'

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleSearch = () => setIsSearchOpen((prev) => !prev)

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
