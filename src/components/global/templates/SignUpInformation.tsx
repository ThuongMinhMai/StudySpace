import { Button, Col, ConfigProvider, DatePicker, Form, Input, Radio, Row, TimePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios' // Assuming axios is used for making API requests
import logoMini from '../../../assets/LOGO SS 04.png'
import moment from 'moment'
import studySpaceAPI from '../../../lib/studySpaceAPI'
import { toast } from 'sonner'
function SignUpInformation() {
  const [role, setRole] = useState<'supplier' | 'user'>('user')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const disableDate = (current: any) => {
    return current && current.isAfter(moment())
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const extractedToken = params.get('token')
    const extractedEmail = params.get('email') // Assuming email is passed via URL

    if (extractedToken) {
      setToken(extractedToken)
    }

    if (extractedEmail) {
      setEmail(extractedEmail)
    }
  }, [location])

  // Ensure email is updated once it's set in state
  useEffect(() => {
    if (email) {
      form.setFieldsValue({ email: email }) // Set the email value in the form
    }
  }, [email, form])
  console.log('token nè', token, email)
  const formatValues = (values: any) => {
    return {
      ...values,
      openTime: values.openTime ? values.openTime.toISOString() : null,
      closeTime: values.closeTime ? values.closeTime.toISOString() : null
    }
  }

  const onSupplierFinish = async (values: any) => {
    const formattedValues = formatValues(values)
    console.log('Supplier Form Values: ', formattedValues)
    setLoading(true)
    try {
      const response = await axios.post(`/Accounts?token=${token}`, values)
      console.log('Supplier Signup Response: ', response.data)
    } catch (error) {
      console.error('Supplier Signup Failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const onUserFinish = async (values: any) => {
    if (!token) {
      toast.error('Token is missing')
      return
    }
    if (!email) {
      toast.error('Email is missing')
      return
    }
    // const formattedValues = formatValues(values)
    const payload = {
      name: values.fullName,
      roleName: 'user',
      email: values.email,
      password: values.password,
      phone: values.phone,
      address: values.address,
      gender: values.gender,
      dob: values.dob.toISOString() // Formatting Date of Birth to ISO string
    }
    console.log('User Form Values: ', payload)

    setLoading(true)
    try {
      const response = await studySpaceAPI.post(`/Accounts?token=${token}`, payload)
      console.log('User Signup Response: ', response.data)
      toast.success('Sign up successfully')
      navigate('/')
    } catch (error) {
      console.error('User Signup Failed:', error)
      toast.error('Sign Up Failed!Please try again!')
    } finally {
      setLoading(false)
    }
  }

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
        <div className='flex-1 relative flex items-center justify-center p-8 '>
          <div className='w-4/5'>
            <h2 className='text-3xl font-semibold text-center mb-4'>Sign Up</h2>
            <p className='flex text-center gap-2 justify-center items-start text-gray-500 mb-10'>
              to continue with <img className='w-5 h-5' src={logoMini} alt='logo' />
              <span>StudySpace</span>
            </p>

            {/* Role Selection */}
            <div className='flex justify-center items-center'>
              <Form.Item label='You sign up with the role:'>
                <Radio.Group onChange={onRoleChange} value={role}>
                  <Radio value='user'>User</Radio>
                  <Radio value='supplier'>Supplier</Radio>
                </Radio.Group>
              </Form.Item>
            </div>

            {/* Supplier Form */}
            {role === 'supplier' && (
              <Form name='supplier_sign_up' form={form} onFinish={onSupplierFinish} layout='vertical' className=''>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Business Name</span>}
                      name='name'
                      rules={[{ required: true, message: 'Please input your business name!' }]}
                    >
                      <Input placeholder='Enter your business name' size='middle' />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Business Address</span>}
                      name='address'
                      rules={[{ required: true, message: 'Please input your business address!' }]}
                    >
                      <Input placeholder='Enter your business address' size='middle' />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Phone Number</span>}
                      name='phone'
                      rules={[
                        { required: true, message: 'Please input your phone number!' },
                        {
                          pattern: /^0\d{9}$/,
                          message: 'Phone number must start with 0 and contain 10 digits!'
                        }
                      ]}
                    >
                      <Input placeholder='Enter your phone number' size='middle' />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Email</span>}
                      name='email'
                      rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                      ]}
                    >
                      <Input
                        type='email'
                        placeholder='Enter your email'
                        size='middle'
                        className='cursor-not-allowed'
                        readOnly
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Password</span>}
                      name='password'
                      rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 6, message: 'Password must be at least 6 characters long!' },
                        {
                          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                          message:
                            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!'
                        }
                      ]}
                      hasFeedback
                    >
                      <Input.Password placeholder='Enter your password' size='middle' />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Confirm Password</span>}
                      name='confirmPassword'
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve()
                            }
                            return Promise.reject(new Error('Passwords do not match!'))
                          }
                        })
                      ]}
                    >
                      <Input.Password placeholder='Confirm your password' size='middle' />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Open Time</span>}
                      name='openTime'
                      rules={[{ required: true, message: 'Please select open time!' }]}
                    >
                      <TimePicker className='w-full' format='HH:mm' />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Close Time</span>}
                      name='closeTime'
                      rules={[{ required: true, message: 'Please select close time!' }]}
                    >
                      <TimePicker className='w-full' format='HH:mm' />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Is Overnight Service Available?</span>}
                      name='isOverNight'
                      rules={[{ required: true, message: 'Please choose an option!' }]}
                    >
                      <Radio.Group>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Description</span>}
                      name='description'
                      rules={[{ required: true, message: 'Please input a description!' }]}
                    >
                      <Input.TextArea placeholder='Enter a brief description' size='middle' rows={4} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Tax Number</span>}
                      name='taxNumber'
                      rules={[
                        { required: true, message: 'Please input your tax number!' },
                        { pattern: /^[0-9]+$/, message: 'Tax number must be numeric!' }
                      ]}
                    >
                      <Input placeholder='Enter your tax number' size='middle' />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Postal Number</span>}
                      name='postalNumber'
                      rules={[
                        { required: true, message: 'Please input your postal number!' },
                        { pattern: /^[0-9]+$/, message: 'Postal number must be numeric!' }
                      ]}
                    >
                      <Input placeholder='Enter your postal number' size='middle' />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16} justify='center' align='middle'>
                  <Col span={12}>
                    <Form.Item>
                      <Button type='primary' htmlType='submit' size='middle' block loading={loading}>
                        Sign Up as Supplier
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            )}

            {/* User Form */}
            {role === 'user' && (
              <Form name='user_sign_up' form={form} onFinish={onUserFinish} layout='vertical'>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Full Name</span>}
                      name='fullName'
                      rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                      <Input placeholder='Enter your full name' size='middle' />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Date of Birth</span>}
                      name='dob'
                      rules={[{ required: true, message: 'Please select your date of birth!' }]}
                    >
                      <DatePicker className='w-full' size='middle' disabledDate={disableDate} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Phone Number</span>}
                      name='phone'
                      rules={[
                        { required: true, message: 'Please input your phone number!' },
                        {
                          pattern: /^0\d{9}$/,
                          message: 'Phone number must start with 0 and contain 10 digits!'
                        }
                      ]}
                    >
                      <Input placeholder='Enter your phone number' size='middle' />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Email</span>}
                      name='email'
                      rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                      ]}
                    >
                      <Input
                        type='email'
                        placeholder='Enter your email'
                        size='middle'
                        readOnly
                        className='cursor-not-allowed' // Set cursor to 'not-allowed'
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Password</span>}
                      name='password'
                      rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 6, message: 'Password must be at least 6 characters long!' },
                        {
                          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                          message:
                            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!'
                        }
                      ]}
                      hasFeedback
                    >
                      <Input.Password placeholder='Enter your password' size='middle' />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Confirm Password</span>}
                      name='confirmPassword'
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve()
                            }
                            return Promise.reject(new Error('Passwords do not match!'))
                          }
                        })
                      ]}
                    >
                      <Input.Password placeholder='Confirm your password' size='middle' />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Address</span>}
                      name='address'
                      rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                      <Input placeholder='Enter your address' size='middle' />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<span className='font-medium'>Gender</span>}
                      name='gender'
                      rules={[{ required: true, message: 'Please select your gender!' }]}
                    >
                      <Radio.Group>
                        <Radio value='nam'>Male</Radio>
                        <Radio value='nu'>Female</Radio>
                        <Radio value='none'>Other</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} justify='center' align='middle'>
                  <Col span={12}>
                    <Form.Item>
                      <Button type='primary' htmlType='submit' size='middle' block loading={loading}>
                        Sign Up as User
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            )}

            <div className='text-center'>
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
