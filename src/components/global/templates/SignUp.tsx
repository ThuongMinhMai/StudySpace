import { Button, ConfigProvider, Form, Input, Tooltip } from 'antd'
import { Undo2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import studySpaceAPI from '../../../lib/studySpaceAPI'
import { toast } from 'sonner'

import logoMini from '../../../assets/LOGO SS 04.png'

function SignUp() {
  const navigate = useNavigate()
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [slideOut, setSlideOut] = useState(false)
  const [email, setEmail] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isResending, setIsResending] = useState(false)

  // Handle form submission
  const onFinish = async (values: any) => {
    setEmail(values.email)  // Store the email to use for resending
    setIsSending(true)  // Start loading
    try {
      // Send a POST request to the signup API
      const response = await studySpaceAPI.post('/Accounts/email-sending-confirmation', values.email )
      console.log(response.data)

      // Add slide-out animation for the form
      setSlideOut(true)
      setTimeout(() => {
        setIsSignedUp(true)
        setIsSending(false)  // Stop loading
      }, 500) // Wait for the form to slide out before showing success
    } catch (error) {
      console.error('Signup failed', error)
      setIsSending(false)  // Stop loading
    }
  }

  // Handle resend email action
  const handleResendEmail = async () => {
    setIsResending(true)  // Start loading
    try {
      // Send a POST request to resend confirmation email
      const response = await studySpaceAPI.post('/Accounts/send-confirm-mail',  email )
      toast.success("Email resent successfully")
      console.log('Resend email response:', response.data)
      setIsResending(false)  // Stop loading
    } catch (error) {
      console.error('Resend email failed', error)
      setIsResending(false)  // Stop loading
    }
  }

  const handleReturn = () => {
    navigate(-1)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#647C6C'
        }
      }}
    >
      <div className='flex h-screen overflow-hidden relative'>
        {isSignedUp ? (
          <div className='flex items-center justify-center h-screen w-full animate-slide-in'>
            {/* Success Message */}
            <div className='flex flex-col items-center justify-between w-full rounded-lg'>
              <div className='flex items-center h-56 justify-center'>
                <img
                  src='https://i.pinimg.com/originals/91/36/df/9136df0949a40e6567c6f4f7a6343672.gif'
                  alt='Sign Up Successful'
                  className='w-2/4 lg:w-full object-cover'
                />
              </div>

              <div className='flex flex-col justify-center items-center mt-10 '>
                <h2 className='text-4xl font-semibold text-gray-800 mb-4 animate-slide-in'>
                  Sign Up Successful!
                </h2>
                <p className='text-gray-600 text-lg mb-6'>
                  Thank you for signing up! Please check your email to confirm your registration and
                  complete the setup.
                </p>
                <p className='text-gray-500'>
                  Didn’t receive the email? Check your spam folder or{' '}
                  <a href='#' className='text-[#647C6C] underline' onClick={handleResendEmail}>
                    {isResending ? 'Resending...' : 'Resend the email'}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className={`flex h-screen w-full ${slideOut ? 'animate-slide-out' : 'animate-slide-in'}`}>
            {/* Image Section */}
            <div className='flex-1 flex items-center justify-center bg-gray-200 lg:block md:block hidden'>
              <img
                src='https://p16-va.lemon8cdn.com/tos-alisg-v-a3e477-sg/oQADpfn1Q8ETg9C1MADQAk9ABQiBbtxYkGeNgN~tplv-tej9nj120t-origin.webp'
                alt='Sign Up'
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
                <h2 className='text-3xl font-semibold text-center mb-4'>Sign Up</h2>
                <p className='flex text-center gap-2 justify-center items-start text-gray-500 mb-10'>
                  to continue with <img className='w-5 h-5' src={logoMini} alt='logo' />
                  <span>StudySpace</span>
                </p>
                <Form name='sign_up' onFinish={onFinish} layout='vertical' className='space-y-8'>
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

                  <Form.Item>
                    <Button type='primary' htmlType='submit' size='large' block loading={isSending}>
                      {isSending ? 'Sending...' : 'Continue'}
                    </Button>
                  </Form.Item>
                </Form>
                <div className='text-center mt-6'>
                  Already have an account?
                  <Link to='/signin' className='text-[#647C6C] hover:underline'>
                    {' '}
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ConfigProvider>
  )
}

export default SignUp
