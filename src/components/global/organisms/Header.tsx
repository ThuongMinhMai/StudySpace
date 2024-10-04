import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import { CircleUser, FileBox, LogOut, Search, Wallet } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../assets/LOGO SS ()-01.png'
import { useAuth } from '../../../auth/AuthProvider'
import SearchPage from './SearchPage'
function Header({ isSearchOpen, toggleSearch }: any) {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className='cursor-not-allowed'>
          <p className='font-bold'>{user?.name}</p>
          <p className='font-medium'>{user?.email || 'My Account'}</p>
        </div>
      )
    },
    {
      type: 'divider'
    },
    {
      key: '2',
      label: (
        <div onClick={() => navigate('/profile')}>
          {' '}
          {/* Navigate to /profile */}
          Profile
        </div>
      ),
      icon: <CircleUser onClick={() => navigate('/profile')} strokeWidth={1} className='w-5 h-5' />
    },

    {
      key: '3',
      label: (
        <div onClick={() => navigate('/booking')}>
          {' '}
          {/* Navigate to /profile */}
          Booking
        </div>
      ),
      icon: <FileBox onClick={() => navigate('/booking')} strokeWidth={1} className='w-5 h-5' />
    },
    {
      key: '4',
      label: (
        <div onClick={() => navigate('/transaction')}>
          {' '}
          {/* Navigate to /profile */}
          Wallet
        </div>
      ),
      icon: <Wallet onClick={() => navigate('/transaction')} strokeWidth={1} className='w-5 h-5' />
    },
    {
      type: 'divider'
    },
    {
      key: '5',
      label: <div onClick={logout}>Logout</div>,
      icon: <LogOut onClick={logout} strokeWidth={1} className='w-5 h-5' />
    }
  ]
  // const { data, isLoading, isError, refetch } = fetchUserDetail(user?.UserID || "");
  return (
    <div>
      {isSearchOpen && <SearchPage isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />}

      <div className='fixed top-0 bg-white py-4 w-full right-0 left-0 z-50 flex justify-between items-center gap-10 lg:px-40 m-auto border-b-2'>
        <Link to='/'>
          {/* <p className='font-greatvibes text-5xl mr-3 text-[#3D4449]'>StudySpace</p> */}
          <img className='max-h-16 ml-10 w-auto my-auto -mt-4 object-contain' src={logo} alt='logo' />
        </Link>
        <div
          onClick={toggleSearch}
          className='flex justify-center items-center gap-4 border-[#3D4449] border-[1px] w-1/3 rounded-full py-3 cursor-pointer'
        >
          {/* <div className='flex justify-center items-center gap-4 border-[#3D4449] border-[1px] w-1/3 rounded-full py-3'> */}
          <Search className='w-4 h-4 mt-1' />
          <p className='hidden lg:block'>Where are you looking for space?</p>
          {/* </div> */}
        </div>
        {/* <input placeholder='What are you looking for?' className='w-full border-black' /> */}

        {user ? (
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <div className='flex justify-center items-center text-nowrap bg-[#C6A083] px-3 py-1 gap-2 rounded-full hover:bg-[#efd2af] transition-all cursor-pointer'>
                  <img
                    className='w-8 h-8 rounded-full object-cover'
                    src={'https://m.media-amazon.com/images/I/51ID6ovRfCL._AC_UF1000,1000_QL80_.jpg'}
                    alt='User avatar'
                  />
                  {/* <p className='font-medium'>{user?.name}</p> */}
                  <p className='font-medium'>
                    {user?.name
                      ?.split(' ')
                      .filter((_, index, arr) => index === 0 || index === arr.length - 1)
                      .join(' ')}
                  </p>
                </div>
              </Space>
            </a>
          </Dropdown>
        ) : (
          <Link
            className=' text-nowrap bg-[#D1C6B9] px-10 py-2 rounded-full hover:bg-[#efd2af] transition-all'
            to='/signin'
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
