import { Button, ConfigProvider, Form, Input, Radio } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logoMini from '../../../assets/LOGO SS 04.png'

function SignUpInformation() {
  const [role, setRole] = useState<'supplier' | 'user'>('user') // State for selected role

  const onFinish = async (values: any) => {
    console.log('Received values from form: ', values)
    // Handle the form submission based on role
  }

  // Handle role change
  const onRoleChange = (e: any) => {
    setRole(e.target.value)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#647C6C'
        }
      }}
    >
      <div className='flex h-screen overflow-hidden'>
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
          <div className='w-1/2 max-w-md'>
            <h2 className='text-3xl font-semibold text-center mb-4'>Sign Up</h2>
            <p className='flex text-center gap-2 justify-center items-start text-gray-500 mb-10'>
              to continue with <img className='w-5 h-5' src={logoMini} alt='logo' />
              <span>StudySpace</span>
            </p>

            <Form name='sign_up' onFinish={onFinish} layout='vertical' className='space-y-8'>
              {/* Role Selection */}
              <Form.Item label='You sign up with the role:'>
                <Radio.Group onChange={onRoleChange} value={role}>
                  <Radio value='user'>User</Radio>
                  <Radio value='supplier'>Supplier</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Common Field for Both Roles */}
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

              {/* Conditional Fields for Supplier */}
              {role === 'supplier' && (
                <>
                  <Form.Item
                    label={<span className='font-medium'>Business Name</span>}
                    name='businessName'
                    rules={[{ required: true, message: 'Please input your business name!' }]}
                  >
                    <Input placeholder='Enter your business name' size='large' />
                  </Form.Item>

                  <Form.Item
                    label={<span className='font-medium'>Business Address</span>}
                    name='businessAddress'
                    rules={[{ required: true, message: 'Please input your business address!' }]}
                  >
                    <Input placeholder='Enter your business address' size='large' />
                  </Form.Item>
                </>
              )}

              {/* Conditional Fields for User */}
              {role === 'user' && (
                <>
                  <Form.Item
                    label={<span className='font-medium'>Full Name</span>}
                    name='fullName'
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                  >
                    <Input placeholder='Enter your full name' size='large' />
                  </Form.Item>

                  <Form.Item
                    label={<span className='font-medium'>Phone Number</span>}
                    name='phoneNumber'
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                  >
                    <Input placeholder='Enter your phone number' size='large' />
                  </Form.Item>
                </>
              )}

              <Form.Item>
                <Button type='primary' htmlType='submit' size='large' block>
                  Sign Up
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
    </ConfigProvider>
  )
}

export default SignUpInformation
