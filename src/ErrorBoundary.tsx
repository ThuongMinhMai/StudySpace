import { Button, ConfigProvider } from 'antd'
import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}
const imgae = [
  'https://cdni.iconscout.com/illustration/premium/thumb/something-went-wrong-illustration-download-in-svg-png-gif-file-formats--question-error-state-pack-seo-web-illustrations-2133695.png?f=webp',
  'https://cdni.iconscout.com/illustration/premium/thumb/page-not-found-illustration-download-in-svg-png-gif-file-formats--available-invalid-address-wrong-error-state-pack-seo-web-illustrations-2133703.png?f=webp',
  'https://cdni.iconscout.com/illustration/premium/thumb/no-search-found-illustration-download-in-svg-png-gif-file-formats--not-seach-available-nothing-error-state-pack-seo-web-illustrations-2133696.png?f=webp'
]
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, errorInfo)
  }
  handleRefresh = () => {
    window.location.reload() // Refresh the page
  }
  handleHomePage = () => {
    window.location.href = '/' // Navigate to the homepage
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className='w full h-screen flex flex-col gap-5 justify-center items-center overflow-hidden'>
          <img
            className='h-96 w-auto'
            src='https://cdni.iconscout.com/illustration/premium/thumb/something-went-wrong-illustration-download-in-svg-png-gif-file-formats--question-error-state-pack-seo-web-illustrations-2133695.png?f=webp'
          />
          <div className='text-center'>
            <p className='text-2xl font-bold'>Ahhhh! Something went wrong</p>
            <p className='my-2'>Brace yourself till we get the error fixed</p>

            <p>
              You may also{' '}
              <span className='text-[#54d780] font-bold hover:underline cursor-pointer' onClick={this.handleRefresh}>
                refresh
              </span>{' '}
              the page or try again!
            </p>
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#647C6C'
              },
              components: {
                Button: {}
              }
            }}
          >
            <Button type='primary' onClick={this.handleHomePage}>
              HomePage
            </Button>
          </ConfigProvider>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
