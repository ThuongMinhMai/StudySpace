import { Button, ConfigProvider, Form, Input, Tooltip } from 'antd'
import { Undo2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import logoMini from '../../../assets/LOGO SS 04.png'
import { useAuth } from '../../../auth/AuthProvider'
function SignIn() {
  const { login, loginWithGG, loadingGG, loading } = useAuth()
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    console.log('Received values from form: ', values)
    try {
      console.log(values)

      await login(values.email, values.password)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
  const handleReturn = () => {
    navigate(-1) // This navigates back to the previous page
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#647C6C'
        },
        components: {
          Button: {
            // colorTextLightSolid: '#647C6C',
            // colorText:"white"
          }
        }
      }}
    >
      <div className='flex h-screen overflow-hidden'>
        {/* Image Section */}
        <div className='flex-1 flex items-center justify-center bg-gray-200 lg:block md:block hidden'>
          <img
            src='https://p16-va.lemon8cdn.com/tos-alisg-v-a3e477-sg/oQADpfn1Q8ETg9C1MADQAk9ABQiBbtxYkGeNgN~tplv-tej9nj120t-origin.webp'
            alt='Sign In'
            className='lg:max-w-full lg:h-auto h-full w-auto object-cover'
          />
        </div>

        {/* Form Section */}
        <div className='flex-1 relative flex items-center justify-center p-8'>
          <Tooltip title='Return' color='#647C6C'>
            <Undo2
              strokeWidth={1}
              className='absolute right-10 top-10 hover:text-[#647C6C] cursor-pointer'
              onClick={handleReturn}
            />
          </Tooltip>

          <div className='w-1/2 max-w-md'>
            <h2 className='text-3xl font-semibold text-center mb-4 '>Sign In</h2>
            <p className='flex text-center gap-2 justify-center items-start text-gray-500 mb-10'>
              to continue with <img className='w-5 h-5' src={logoMini} />
              <span>StudySpace</span>
            </p>
            <Form name='sign_in' onFinish={onFinish} layout='vertical' className='space-y-8'>
              <Form.Item
                label={<span className='font-medium'>Email</span>}
                name='email'
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input type='email' placeholder='Enter your email' size='large' />
              </Form.Item>

              <Form.Item
                label={<span className='font-medium'>Password</span>}
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder='Enter your password' size='large' />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  size='large'
                  block
                  loading={loading} // Disable button and show loading spinner during API call
                  disabled={loading} // Optionally, also disable it explicitly
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form.Item>
            </Form>
            <div className='text-center mt-6'>
              You don't have an account yet?
              <Link to='/signup' className='text-[#647C6C] hover:underline '>
                {' '}
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default SignIn
