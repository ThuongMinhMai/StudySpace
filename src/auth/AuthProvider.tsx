// src/auth/AuthProvider.tsx
import axios from 'axios'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import studySpaceAPI from '../lib/studySpaceAPI'
import { toast } from 'sonner'
import { duration } from 'moment'
// import { useInvoice } from '@/contexts/InvoiceContext'
// Define the shape of our AuthContext
interface AuthContextType {
  token: string | null
  user: User | null
  login: (username: string, password: string) => Promise<void>
  loginWithGG: (AccessToken: string) => Promise<void>
  logout: () => void
  errorMessage: string | null
  loading: boolean
  loadingGG: boolean
}

// Define the shape of User
interface User {
  userID: string
  roleName: string
  phone: string
  name: string
  gender: string
  email: string
  avaURL: string
  address: string
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Define the AuthProvider component
interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token')
  })
  const [user, setUser] = useState<User | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingGG, setLoadingGG] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await studySpaceAPI.post<User>('/Accounts/token-decode', token)
          // const response = await studySpaceAPI.post<User>('/Accounts/decode', {
          //   headers: {
          //     Authorization: `Bearer ${token}`
          //   }
          // })
          // setUser(response.data)
          if (response.data.roleName === 'User') {
            setUser(response.data)
          } else {
            toast.error('Tài khoản không tồn tại với vai trò người dùng')
            localStorage.removeItem('token')
          }
        } catch (error) {
          localStorage.removeItem('token')
          localStorage.removeItem('token')
          console.error('Fetching user information failed:', error)
        }
      }
    }
    fetchUser()
  }, [token])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await studySpaceAPI.post('/Accounts/login-authen', {
        email: email,
        password: password
      })
      const newToken = response.data.token.token
      setToken(newToken)
      localStorage.setItem('token', newToken)
      setErrorMessage(null)
      toast.success('Đăng nhập thành công')
      navigate(-1)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error)
        const message = error.response.data
        toast.error(message)
      
        setErrorMessage(message)
      } else {
        console.error('Login failed:', error)
      }
    } finally {
      setLoading(false)
    }
  }
  const loginWithGG = async (accessToken: string) => {
    setLoadingGG(true)
    try {
      setLoading(true)
      const response = await studySpaceAPI.post('/auth-management/managed-auths/access-token-verification', accessToken)
      const newToken = response.data.token
      setToken(newToken)
      localStorage.setItem('token', newToken)
      setErrorMessage(null)
      toast.success('Đăng nhập thành công')
      navigate(-1)
      setLoadingGG(false)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error)
        localStorage.removeItem('token')

        toast.error('Lỗi đăng nhập')
        setLoadingGG(false)
      }
    } finally {
      setLoadingGG(false)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    toast.success('Đăng xuất tài khoản thành công')
    // Redirect to login page after logout
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ token, user, loadingGG, loginWithGG, login, logout, errorMessage, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
