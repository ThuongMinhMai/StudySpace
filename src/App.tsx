import { Route, Routes } from 'react-router-dom'
import HomePage from './components/global/templates/HomePage'
import RoomPage from './components/global/templates/RoomPage'
import RootLayout from './components/global/templates/RootLayout'
import NotFound from './components/global/organisms/NotFound'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route element={<RootLayout/>}>

      <Route path='/room' element={<RoomPage />} />
      </Route>

      <Route path='*' element={<NotFound />} />

    </Routes>
  )
}

export default App
