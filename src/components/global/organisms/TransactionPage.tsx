import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Button, Card, Modal, Pagination, Tag } from 'antd'
import 'antd/dist/reset.css'
import { useEffect, useState } from 'react'

// Define the structure of a transaction
interface Transaction {
  id: string
  transactionId: string
  date: string
  amount: number
  paymentMethod: string
  status: string
}

// Mocked transaction data (replace this with actual API data)
const mockTransactions: Transaction[] = [
  {
    id: '1',
    transactionId: 'TXN123456',
    date: '2024-09-25',
    amount: 200,
    paymentMethod: 'Credit Card',
    status: 'Completed'
  },
  {
    id: '2',
    transactionId: 'TXN789012',
    date: '2024-09-26',
    amount: 150,
    paymentMethod: 'PayPal',
    status: 'Failed'
  },
  {
    id: '3',
    transactionId: 'TXN345678',
    date: '2024-09-27',
    amount: 350,
    paymentMethod: 'Bank Transfer',
    status: 'Completed'
  },
  {
    id: '4',
    transactionId: 'TXN123456',
    date: '2024-09-25',
    amount: 200,
    paymentMethod: 'Credit Card',
    status: 'Completed'
  },
  {
    id: '5',
    transactionId: 'TXN789012',
    date: '2024-09-26',
    amount: 150,
    paymentMethod: 'PayPal',
    status: 'Failed'
  },
  {
    id: '6',
    transactionId: 'TXN345678',
    date: '2024-09-27',
    amount: 350,
    paymentMethod: 'Bank Transfer',
    status: 'Completed'
  },
  {
    id: '7',
    transactionId: 'TXN123456',
    date: '2024-09-25',
    amount: 200,
    paymentMethod: 'Credit Card',
    status: 'Completed'
  },
  {
    id: '8',
    transactionId: 'TXN789012',
    date: '2024-09-26',
    amount: 150,
    paymentMethod: 'PayPal',
    status: 'Failed'
  },
  {
    id: '9',
    transactionId: 'TXN345678',
    date: '2024-09-27',
    amount: 350,
    paymentMethod: 'Bank Transfer',
    status: 'Completed'
  }
  // Add more transactions here
]

function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null) // For modal
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(5) // Set the number of items per page

  useEffect(() => {
    // In a real-world app, you would fetch data from an API
    setTransactions(mockTransactions) // Set the mock data
  }, [])

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
          <Card key={transaction.id} className='shadow-lg'>
            <div className='flex items-center justify-between p-4'>
              {/* Transaction Info */}
              <div className='flex items-center space-x-6'>
                <p className='text-sm'>
                  <strong>Transaction ID:</strong> {transaction.transactionId}
                </p>
                <p className='text-sm'>
                  <strong>Date:</strong> {transaction.date}
                </p>
                <p className='text-sm'>
                  <strong>Amount:</strong> ${transaction.amount.toFixed(2)}
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
              <Button type='primary' onClick={() => showModal(transaction)}>
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        className='mt-6 '
        current={currentPage}
        pageSize={pageSize}
        total={transactions.length}
        onChange={handlePageChange}
      />

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
            <h2 className='font-semibold text-xl'>Transaction: {selectedTransaction.transactionId}</h2>
            <p className='text-sm text-gray-500'>
              <strong>Date:</strong> {selectedTransaction.date}
            </p>
            <p className='text-sm text-gray-500'>
              <strong>Amount:</strong> ${selectedTransaction.amount.toFixed(2)}
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
