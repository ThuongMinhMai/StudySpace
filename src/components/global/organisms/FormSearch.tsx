import { Button, Col, ConfigProvider, Form, Row, Select, Spin } from 'antd'
import { Box, MapPin, Rocket, SearchCheck, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import studySpaceAPI from '../../../lib/studySpaceAPI'
const { Option } = Select

function FormSearch({ initialLocation, initialTypeSpace, initialTypeRoom, initialPersons, onSearchChange }: any) {
  const [form] = Form.useForm() // Create a form instance
  const [locations, setLocations] = useState<string[]>([])
  const [typeSpace, setTypeSpace] = useState<string[]>([])
  const [loadingLocations, setLoadingLocations] = useState(true)
  const [loadingTypeSpace, setLoadingTypeSpace] = useState(true)
  // const locations = [
  //   'All',
  //   'District 1',
  //   'District 2',
  //   'District 3',
  //   'District Bình Thạnh',
  //   'Thủ Đức City',
  //   'District 9',
  //   'District 7',
  //   'District 10',
  //   'District 8',
  //   'District 5'
  // ]
  useEffect(() => {
    // Fetch locations from API
    setLoadingLocations(true)
    studySpaceAPI
      .get('/Stores/address')
      .then((response) => {
        setLocations(response.data.data)
      })

      .catch((error) => {
        console.error('Error fetching locations:', error)
      })
      .finally(() => {
        setLoadingLocations(false)
      })

    // Fetch typeSpace from API
    setLoadingTypeSpace(true)
    studySpaceAPI
      .get('/Space/name')
      .then((response) => {
        setTypeSpace(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching typeSpace:', error)
      })
      .finally(() => {
        setLoadingTypeSpace(false)
      })
  }, [])

  useEffect(() => {
    // Reset the form fields when props change
    form.resetFields()
  }, [initialLocation, initialTypeSpace, initialPersons])
  // const typeRoom = ['All', 'Office', 'Co-working', 'Meeting room']
  // const typeSpace = ['All', 'Library Space', 'Coffee Space', 'Meeting Room']

  // Generate options for number of persons
  // const numberOptions = Array.from({ length: 10 }, (_, i) => i + 1)
  const numberOptions = [
    { value: 0, label: 'All' }, // Add this line
    ...Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: (i + 1).toString() }))
  ]

  const onFinish = (values: any) => {
    onSearchChange(values)
    // You can perform search or navigation based on form values here
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#647C6C'
        }
      }}
    >
      <div className='header_room w-3/5 mx-auto p-6 pr-20 bg-white shadow-lg flex justify-center items-center rounded-lg  '>
        <Form
          className=' flex-1 lg:ml-10'
          form={form} // Assign the form instance to the Form component
          layout='vertical'
          onFinish={onFinish}
          // initialValues={{
          //   location: 'All', // Default value for Location
          //   typeSpace: 'All', // Default value for Type Space
          //   typeRoom: 'All', // Default value for Type Room
          //   persons: 2 // Default value for Number of Persons
          // }}
          initialValues={{
            location: initialLocation || 'All', // Set initial value for Location
            typeSpace: initialTypeSpace || 'All', // Set initial value for Type Space
            // typeRoom: initialTypeRoom || 'All', // Set initial value for Type Room
            persons: initialPersons || 0 // Set initial value for Number of Persons
          }}
        >
          <Row gutter={[16, 16]} justify='center' align='middle'>
            {/* Location Select */}
            <Col xs={24} sm={12} md={6} className='flex gap-1 justify-center items-center '>
              <div className=' '>
                <MapPin className='w-8 h-8 mt-2' strokeWidth={1} fill='#647C6C' color='white' />
              </div>
              <Form.Item
                label={<span className='font-medium ml-1 text-lg'>Location</span>}
                name='location'
                className='w-full m-auto'
              >
                {loadingLocations ? (
                  <Spin /> // Loading spinner for locations
                ) : (
                  <Select
                    showSearch
                    placeholder='Select Location'
                    optionFilterProp='children'
                    filterOption={(input, option: any) => option.children.toLowerCase().includes(input.toLowerCase())}
                    className='rounded-lg w-full'
                  >
                    {locations?.map((location) => (
                      <Option key={location} value={location}>
                        {location}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} className='flex gap-1 justify-center items-center'>
              <div>
                <Rocket className='w-8 h-8 mt-2' strokeWidth={1} fill='#647C6C' color='white' />
              </div>
              <Form.Item
                label={<span className='font-medium ml-1 text-lg'>Type Space</span>}
                name='typeSpace'
                className='w-full m-auto'
              >
                {/* <Select placeholder='Select Type' className='rounded-lg w-full'>
                  {typeSpace.map((typeSpace) => (
                    <Option key={typeSpace} value={typeSpace}>
                      {typeSpace}
                    </Option>
                  ))}
                </Select> */}
                {loadingTypeSpace ? (
                  <Spin /> // Loading spinner for typeSpace
                ) : (
                  <Select placeholder='Select Type' className='rounded-lg w-full'>
                    {typeSpace?.map((space) => (
                      <Option key={space} value={space}>
                        {space}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            {/* Type Room Select */}
            {/* <Col xs={24} sm={12} md={5} className='flex gap-1 justify-center items-center'>
              <div>
                <Box className='w-8 h-8 mt-2' strokeWidth={1} fill='#647C6C' color='white' />
              </div>
              <Form.Item
                label={<span className='font-medium ml-1 text-lg'>Type Room</span>}
                name='typeRoom'
                className='w-full m-auto'
              >
                <Select placeholder='Select Type' className='rounded-lg w-full'>
                  {typeRoom.map((typeRoom) => (
                    <Option key={typeRoom} value={typeRoom}>
                      {typeRoom}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col> */}

            {/* Type Space Select */}

            {/* Number of Persons Select */}
            <Col xs={24} sm={12} md={6} className='flex gap-1 justify-center items-center '>
              <div>
                <UserRound className='w-8 h-8 mt-2' strokeWidth={1} fill='#647C6C' color='white' />
              </div>
              <Form.Item
                label={<span className='font-medium ml-1 text-lg'>Person</span>}
                name='persons'
                className='w-full m-auto'
              >
                <Select placeholder='Select Number' className='rounded-lg w-full'>
                  {numberOptions.map((option) => (
                    <Option key={option.value} value={option.value} >
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Submit Button */}
            <Col xs={24} sm={12} md={6}>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                icon={<SearchCheck />}
                className='rounded-lg h-10 mt-6 '
              >
                Check Available
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </ConfigProvider>
  )
}

export default FormSearch
