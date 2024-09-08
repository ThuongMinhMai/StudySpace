import { Route, Routes } from 'react-router-dom'
import HomePage from './components/global/templates/HomePage'
import RoomPage from './components/global/templates/RoomPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/room' element={<RoomPage />} />
    </Routes>
  )
}

export default App
