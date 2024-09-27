import React from 'react'
import { Form, Input, Button, ConfigProvider } from 'antd'
import logoMini from '../../../assets/LOGO SS 04.png'
function SignIn() {
  const onFinish = (values: any) => {
    console.log('Received values from form: ', values)
    // Handle sign-in logic here
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
        <div className='flex-1 flex items-center justify-center p-8'>
          <div className='w-full max-w-md'>
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
                <Button type='primary' htmlType='submit' size='large' block>
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default SignIn
