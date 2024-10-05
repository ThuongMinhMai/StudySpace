import { Result } from 'antd'

function SignUpSuccessfully() {
  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <Result
        status='success'
        title='Registration Successful!'
        subTitle='You have successfully registered as a supplier. Please check your email for further instructions on how to complete the process.'
      />
    </div>
  )
}

export default SignUpSuccessfully
