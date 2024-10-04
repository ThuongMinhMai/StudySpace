import { fetchUserDetail, updateUserProfile } from '../../../apis/userAPI'
import { useAuth } from '../../../auth/AuthProvider'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/global/atoms/avatar'
// import Loader from '@/components/local/TabCardTrip/Loader'
import { useQueryClient } from '@tanstack/react-query'
import { Avatar, Button, ConfigProvider, Form, Input } from 'antd'
import { RuleObject } from 'antd/lib/form'
import { Key, PiggyBank } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import avaDefaul from '../../../assets/whychooseus.png'
import { formatPrice } from '../../../lib/utils'
// import Loading from '@/components/local/login/Loading'
function ProfilePage() {
  const { user } = useAuth()
  const { data, isLoading, isError, refetch } = fetchUserDetail(user?.userID || '')
  const [loading, setLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [form] = Form.useForm()
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const queryClient = useQueryClient()
  useEffect(() => {
    if (data) {
      // Update form fields when data is available
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        Password: '',
        NewPassword: '',
        ConfirmPassword: ''
      })
    }
  }, [data, form])
  useEffect(() => {
    refetch()
  }, [user, queryClient])

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const droppedFile = acceptedFiles[0]
    if (droppedFile && !droppedFile.type.startsWith('image/')) {
      toast.error('Chỉ chấp nhận tệp tin hình ảnh!')
      return
    }
    setFile(droppedFile)
    const reader = new FileReader()

    reader.onloadend = () => {
      setPreview(reader.result)
      setHasChanges(true)
    }

    if (droppedFile) {
      reader.readAsDataURL(droppedFile)
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    }
  })

  const onSubmit = async (values: any) => {
    console.log("value ne", values)
    const formData = new FormData()
    formData.append('name', values.name || data?.name)
    // formData.append('FullName', values.FullName || data?.FullName)
    formData.append('address', values.address || data?.address)
    formData.append('phone', values.phone || data?.phone)
    formData.append('Password', values.Password)
    formData.append('NewPassword', values.NewPassword)
    formData.append('ConfirmPassword', values.ConfirmPassword)

    if (file) {
      formData.append('AvatarUrl', file)
    } else {
      formData.append('AvatarUrl', '')
    }
    // Logging form data
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`)
    }
    try {
      const response = await updateUserProfile(user?.userID || '', formData)
      setLoading(false)
      // toast.success('Cập nhật profile thành công')

      console.log('Profile updated successfully:', response)
      console.log('Profile updated successfully:', response.data)
      await refetch()
      setHasChanges(false)
      queryClient.invalidateQueries({ queryKey: ['userDetail', user?.userID] })
    } catch (error: any) {
      setLoading(false)
      // toast.error(error.response?.data?.result?.message || 'Mật khẩu cũ không chính xác!')
      console.error('Error updating profile:', error)
    }
  }

  const handleFormSubmit = async (values: any) => {
    setLoading(true)
    await onSubmit(values)
    setHasChanges(false)
  }

  const handleValuesChange = () => {
    setHasChanges(true)
  }

  const validateConfirmPassword = (_rule: RuleObject, value: any) => {
    const passFieldValue = form.getFieldValue('NewPassword')
    if (passFieldValue && !value) {
      return Promise.reject('Vui lòng xác nhận mật khẩu')
    }
    if (value !== passFieldValue) {
      return Promise.reject('Mật khẩu xác nhận không khớp')
    }
    return Promise.resolve()
  }

  const handleTogglePasswordFields = () => {
    setShowPasswordFields((prevShowPasswordFields) => !prevShowPasswordFields)
  }

  const validatePhoneNumber = (_rule: RuleObject, value: any) => {
    if (value && value !== '') {
      const phoneNumberRegex = /^0\d{9}$/
      if (!phoneNumberRegex.test(value)) {
        return Promise.reject('Số điện thoại phải có 10 chữ số và bắt đầu bằng 0')
      }
    }
    return Promise.resolve()
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen w-full'>
        {/* <Loader /> */}
        Loading....
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex justify-center items-center min-h-screen w-full'>
        <p>Đã xảy ra lỗi tải thông tin người dùng. Vui lòng thử lại sau!</p>
      </div>
    )
  }

  return (
    <div className='w-full'>
      <div className='flex mt-4 flex-col items-center justify-center'>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#647C6C'
            },
            components: {
              Button: {
                colorTextLightSolid: '#000000'
              }
            }
          }}
        >
          <Form
            form={form}
            variant='filled'
            onFinish={handleFormSubmit}
            onValuesChange={handleValuesChange}
            className='w-full max-w-3xl rounded-lg p-4 shadow-mini-content'
            layout='vertical'
            initialValues={{
              name: data?.name,
              email: data?.email,
              Password: '',
              // FullName: data?.FullName,

              avaURL: data?.avatarUrl,
              phone: data?.phone,
              address: data?.address,
              NewPassword: '',
              ConfirmPassword: ''
            }}
          >
            <div className='flex flex-col items-center justify-center'>
              <div className='shadow-3xl shadow-shadow-500 dark:!bg-navy-800 relative mx-auto w-full rounded-[20px] drop-shadow-md bg-white bg-clip-border p-4 dark:text-white dark:!shadow-none'>
                <div className='relative flex h-36 w-full justify-center rounded-xl bg-cover'>
                  <img
                    alt='banner'
                    src='https://cdn.prod.website-files.com/5f4a004f01308268d80d6e85/667085ef95151c9a4d5488bd_653000a337042e7bc6074ef8_modern%2520office-cafe-experience.png'
                    className='absolute flex h-40  w-full object-cover justify-center rounded-xl bg-cover'
                  />
                  <div
                    {...getRootProps()}
                    title='Change avatar'
                    className='dark:!border-navy-700 absolute -bottom-16 flex h-[87px] w-[87px] cursor-pointer items-center justify-center rounded-full border-[4px] hover:border-tertiary border-amber-400'
                  >
                    <input {...getInputProps()} />
                    {!preview ? (
                      <Avatar className='h-full w-full' src={data?.avatarUrl || avaDefaul} alt={data?.name}></Avatar>
                    ) : (
                      <Avatar className='h-full w-full ' src={preview as string} alt={data?.name}></Avatar>
                    )}
                  </div>
                </div>
                <div className='mt-16 flex flex-col items-center'>
                  <h4 className='text-navy-700 text-xl font-bold dark:text-white'>{data?.name}</h4>
                  <p className='flex items-center gap-2 text-base font-normal text-gray-600'>
                    <Key size={16} /> {data?.roleName}
                  </p>
                  <p className='flex items-center gap-2 text-lg text-primary font-medium text-gray-600'>
                    <PiggyBank size={24} /> <span>{formatPrice(data?.wallet || 0)}</span>
                  </p>
                </div>

                <Form.Item
                  name='name'
                  label={<span className='font-medium'>Tên người dùng</span>}
                  rules={[{ required: false }]}
                >
                  <Input placeholder='Tên người dùng' />
                </Form.Item>
                {/* <Form.Item
                  name='FullName'
                  label={<span className='font-medium'>Họ và tên</span>}
                  rules={[{ required: true, message: 'Họ và tên không được bỏ trống' }]}
                >
                  <Input placeholder='Họ và tên' />
                </Form.Item> */}
                <Form.Item
                  name='address'
                  label={<span className='font-medium'>Địa chỉ</span>}
                  rules={[{ required: false }]}
                >
                  <Input placeholder='Địa chỉ' />
                </Form.Item>
                <Form.Item className='hidden' name='avatar' label='Avatar' />

                <Form.Item
                  name='phone'
                  label={<span className='font-medium'>PhoneNumber</span>}
                  rules={[{ required: false }, { validator: validatePhoneNumber }]}
                >
                  <Input placeholder='Số điện thoại' />
                </Form.Item>
                <Form.Item name='email' label={<span className='font-medium'>Email</span>} rules={[{ required: true }]}>
                  <Input className='cursor-not-allowed' disabled />
                </Form.Item>

                {/* {data?.Password && ( // Check if data.Password has a value */}
                <Button type='link' className='mb-2 p-0 text-tertiary' onClick={handleTogglePasswordFields}>
                  {showPasswordFields ? 'Ẩn đổi mật khẩu' : 'Đổi mật khẩu'}
                </Button>
                {/* )} */}
                <Form.Item
                  name='Password'
                  label={<span className='font-medium'>Mật khẩu cũ</span>}
                  hidden={!showPasswordFields}
                >
                  <Input.Password placeholder='Nhập mật khẩu cũ' />
                </Form.Item>
                <Form.Item
                  name='NewPassword'
                  label={<span className='font-medium'>Mật khẩu mới</span>}
                  hidden={!showPasswordFields}
                >
                  <Input.Password placeholder='Nhập mật khẩu mới' />
                </Form.Item>

                <Form.Item
                  name='ConfirmPassword'
                  label={<span className='font-medium'>Xác nhận mật khẩu</span>}
                  rules={[{ validator: validateConfirmPassword }]}
                  hidden={!showPasswordFields}
                >
                  <Input.Password placeholder='Xác nhận mật khẩu' />
                </Form.Item>
                <Form.Item className='mb-2 flex justify-center'>
                  <Button
                    type='dashed'
                    htmlType='submit'
                    className={`${loading ? 'bg-green-500 text-white' : ''}`}
                    disabled={!hasChanges}
                  >
                    {loading && <p>loaddinggggg</p>}
                    Cập nhật
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default ProfilePage
