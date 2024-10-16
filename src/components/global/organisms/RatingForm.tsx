import { Button, Form, Input, Rate, Upload, Modal } from 'antd'
import { useState } from 'react'
import { toast } from 'sonner'
import { RcFile, UploadFile } from 'antd/es/upload/interface'
import studySpaceAPI from '../../../lib/studySpaceAPI'
import { Loader } from 'lucide-react'
import { useAuth } from '../../../auth/AuthProvider'
import cry from '../../../assets/cry1.png'
import love from '../../../assets/in-love.png'

interface RatingFormProps {
  bookingId: number
  setShowRatingForm: (show: boolean) => void
  onRatingSuccess: () => void
}

const rateValueToText = ['Rất tệ', 'Tệ', 'Bình thường', 'Hài lòng', 'Tuyệt vời']
const suggestions = [
  'Great experience overall!',
  'Could use some improvements.',
  'Loved the service, but the food was average.',
  'Amazing atmosphere and friendly staff.'
]

function RatingForm({ bookingId, setShowRatingForm, onRatingSuccess }: RatingFormProps) {
  console.log("nha", bookingId)
  const { user } = useAuth()
  const [form] = Form.useForm()
  
  const [files, setFiles] = useState<UploadFile[]>([])
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('UserId', String(user?.userID))
      formData.append('BookingId', String(bookingId))
      formData.append('Rating', values.rating.toString())
      formData.append('ReviewText', values.content || '')

      // Append files if selected
      // files.forEach((file) => {
      //   formData.append('Files', file.originFileObj as RcFile)
      // })
      if (Array.isArray(files)) {
        files.forEach((file: UploadFile) => {
          if (file.originFileObj) {
            formData.append('Files', file.originFileObj)
          }
        })
      }
      console.log('Form Data:', formData)
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`)
      }
      const response = await studySpaceAPI.post('/Feedback', formData)
      setLoading(false)
      toast.success('Successful room review!')
      form.resetFields()
      setFiles([])
      setShowRatingForm(false)
      onRatingSuccess()
    } catch (error) {
      console.error('Error submitting rating:', error)
      setLoading(false)
      toast.error('Room assessment failed. Please try again')
    }
  }

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFiles(fileList)
  }

  

  const handleRatingChange = (value: number) => {
    form.setFieldsValue({ rating: value })
  }

  const handleSuggestionClick = (suggestion: string) => {
    form.setFieldsValue({ content: suggestion }) // Use setFieldsValue to update the content field
  }
  const getRatingText = (rating:number) => {
    switch (rating) {
      case 1:
        return "Bad";
      case 2:
        return "Normal";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  };

  return (
    <Modal
      visible={true}
      title='Feedback'
      onCancel={() => {
        setShowRatingForm(false) // This should hide the modal
      }}
      footer={null}
      centered
    >
      <Form  form={form} onFinish={onFinish} layout='vertical' initialValues={{ rating: 5, content: '' }}>
      <Form.Item
        name="rating"
        label="How would you rate your experience?"
        rules={[{ required: false, message: 'Please select a rating!' }]}
      >
           <div style={{ display: 'flex', justifyContent: 'center', marginTop:"10px" }}>

        <Rate
          character={({ index }:any) =>
            index < form.getFieldValue('rating') ? (
              <img className='w-8 h-8 cursor-pointer' src={love} alt='love' />
            ) : (
              <img className='w-8 h-8 cursor-pointer' src={cry} alt='cry' />
            )
          }
          onChange={(value) => {
            form.setFieldsValue({ rating: value });
          }}
        />
           </div>

      </Form.Item>
      {/* <Form.Item>
        {form.getFieldValue('rating') > 0 && (
          <div >
            {rateValueToText[form.getFieldValue('rating') - 1]}
          </div>
        )}
      </Form.Item> */}

        <Form.Item name='content' label='Content'>
          <Input.TextArea rows={4} placeholder='Enter your feedback' />
        </Form.Item>
        <Form.Item label='Suggestions:'>
          {suggestions.map((suggestion, index) => (
            <Button key={index} onClick={() => handleSuggestionClick(suggestion)} style={{ margin: '0 5px' }}>
              {suggestion}
            </Button>
          ))}
        </Form.Item>

        <Form.Item label='Add images that describe your experience'>
          <Upload
            listType='picture-card'
            fileList={files}
            onChange={handleFileChange}
            beforeUpload={() => false} // Prevent auto upload
            accept='image/*'
          >
            {files.length < 5 && '+ Upload'}
          </Upload>
        </Form.Item>

        <div className='flex justify-end items-center gap-3'>
          <Button onClick={() => setShowRatingForm(false)}>Cancel</Button>
          <Button type='primary' htmlType='submit' loading={loading}>
            {loading && <Loader className='w-4 h-4 animate-spin' />} Feedback
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default RatingForm
