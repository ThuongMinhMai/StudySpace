import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Detail from './components/global/organisms/Detail'
import NotFound from './components/global/organisms/NotFound'
import HomePage from './components/global/templates/HomePage'
import RoomPage from './components/global/templates/RoomPage'
import RootLayout from './components/global/templates/RootLayout'
import SignIn from './components/global/templates/SignIn'
import ProtectedRoute from './auth/ProtectedRoute'
import SignUp from './components/global/templates/SignUp'
import SignUpInformation from './components/global/templates/SignUpInformation'
import ProfilePage from './components/global/organisms/ProfilePage'
import MyRoomPage from './components/global/organisms/MyRoomPage'
import TransactionPage from './components/global/organisms/TransactionPage'
import ProtectUserRoute from './auth/ProtectUserRoute'

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleSearch = () => setIsSearchOpen((prev) => !prev)

  return (
    <Routes>
      {/* Pass isSearchOpen and toggleSearch as props to HomePage */}
      <Route path='/' element={<HomePage isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />} />
      <Route element={<RootLayout isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />}>
        <Route path='/room' element={<RoomPage />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route
          path='/profile'
          element={
            <ProtectUserRoute>
              <ProfilePage />
            </ProtectUserRoute>
          }
        />
        <Route path='/booking' element={<MyRoomPage />} />
        <Route path='/transaction' element={<TransactionPage />} />
      </Route>
      <Route path='*' element={<NotFound />} />
      <Route
        path='/signin'
        element={
          <ProtectedRoute>
            <SignIn />
          </ProtectedRoute>
        }
      />
      <Route
        path='/signup'
        element={
          <ProtectedRoute>
            <SignUp />
          </ProtectedRoute>
        }
      />
      <Route
        path='/signUpInformation'
        element={
          <ProtectedRoute>
            <SignUpInformation />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
