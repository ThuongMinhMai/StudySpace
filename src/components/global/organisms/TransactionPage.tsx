import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Modal, Pagination, Tag } from 'antd'
import 'antd/dist/reset.css'
import { useEffect, useState } from 'react'
import studySpaceAPI from '../../../lib/studySpaceAPI'
import { useAuth } from '../../../auth/AuthProvider'
import { toast } from 'sonner'
import { formatDate, formatDateV2, formatPrice } from '../../../lib/utils'

// Define the structure of a transaction
interface Transaction {
  id: number
  date: string
  fee: number
  paymentMethod: string
  status: string
  type: string
}

// Mocked transaction data (replace this with actual API data)

function TransactionPage() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null) // For modal
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(5) // Set the number of items per page

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await studySpaceAPI.get(`/Transactions/user/${user?.userID}`) // Update with your actual endpoint
        setTransactions(response.data.data) // Set the mock data
      } catch (error) {
        console.error('Error fetching booked rooms:', error)
      }
    }

    fetchTransactions()
    // In a real-world app, you would fetch data from an API
  }, [user?.userID])

  const showModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedTransaction(null)
  }

  // Pagination handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Pagination logic to slice transactions
  const paginatedTransactions = transactions.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className='transaction-page-container p-4 flex flex-col justify-center items-center mt-10 m-auto'>
      <h1 className='text-2xl font-bold mb-6 text-center'>Transaction History</h1>

      {/* Display transactions in a horizontal line style */}
      <div className='space-y-4'>
        {paginatedTransactions.map((transaction) => (
          <Card key={transaction.id} hoverable>
            <div className='flex items-center justify-between p-4'>
              {/* Transaction Info */}
              <div className='flex items-center space-x-6'>
                <p className='text-sm'>
                  <strong>#</strong> {transaction.id}
                </p>
                <p className='text-sm'>
                  <strong>Date:</strong> {formatDateV2(transaction.date)}
                </p>
                <p className='text-sm'>
                  <strong>Amount:</strong> {formatPrice(transaction.fee)}
                </p>
                <p className='text-sm'>
                  <strong>Payment Method:</strong> {transaction.paymentMethod}
                </p>
                <p className='text-sm'>
                  <strong>Status:</strong>{' '}
                  {transaction.status === 'Completed' ? (
                    <Tag color='green'>{transaction.status}</Tag>
                  ) : (
                    <Tag color='red'>{transaction.status}</Tag>
                  )}
                </p>
              </div>

              {/* View Details Button */}
              {/* <Button type='primary' onClick={() => showModal(transaction)}>
                View Details
              </Button> */}
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
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
        <Pagination
          className='mt-6 '
          current={currentPage}
          pageSize={pageSize}
          total={transactions.length}
          onChange={handlePageChange}
        />
      </ConfigProvider>
      {/* Modal for more transaction details */}
      <Modal
        title='Transaction Details'
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key='close' onClick={handleCancel}>
            Close
          </Button>
        ]}
      >
        {selectedTransaction && (
          <div className='p-4'>
            <h2 className='font-semibold text-xl'>Transaction: {selectedTransaction.id}</h2>
            <p className='text-sm text-gray-500'>
              <strong>Date:</strong> {selectedTransaction.date}
            </p>
            <p className='text-sm text-gray-500'>
              <strong>Amount:</strong> {formatPrice(selectedTransaction.fee)}
            </p>
            <p className='text-sm text-gray-500'>
              <strong>Payment Method:</strong> {selectedTransaction.paymentMethod}
            </p>
            <p className='text-sm text-gray-500'>
              <strong>Status:</strong>{' '}
              {selectedTransaction.status === 'Completed' ? (
                <CheckCircleOutlined className='text-green-500' />
              ) : (
                <CloseCircleOutlined className='text-red-500' />
              )}
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default TransactionPage
