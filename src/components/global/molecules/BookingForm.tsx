import { Alert, Button, Checkbox, ConfigProvider, DatePicker, Form, Space, TimePicker, Typography } from 'antd';
import 'antd/dist/reset.css';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

const { RangePicker: TimeRangePicker } = TimePicker;
const { RangePicker: DateTimeRangePicker } = DatePicker;

interface Slot {
  start: string; // e.g., "10:00"
  end: string; // e.g., "11:00"
}

interface BookingFormProps {
  storeOpenTime?: string; // e.g., "09:00"
  storeCloseTime?: string; // e.g., "18:00"
  bookedSlots: { date: string; slots: Slot[] }[] | undefined; // Allowing undefined
}

const BookingForm: React.FC<BookingFormProps> = ({ storeOpenTime, storeCloseTime, bookedSlots = [] }) => {
  const [form] = Form.useForm();
  const [isOvernight, setIsOvernight] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedRangeDate, setSelectedRangeDate] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [overlapWarning, setOverlapWarning] = useState<string | null>(null);
  const [totalBill, setTotalBill] = useState<number>(0);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fieldsValue = form.getFieldsValue();
    calculateTotalBill(fieldsValue);
  }, [form, selectedRangeDate, isOvernight]);

  const handleRangeDateChange = (rangeDates: [Dayjs | null, Dayjs | null] | null) => {
    setSelectedRangeDate(rangeDates);
  };

  const handleBookingTypeChange = (e: any) => {
    setOverlapWarning('');
    setIsOvernight(e.target.checked);
  };

  const handleSubmit = (values: any) => {
    const { date, timeRange } = values;

    if (isOvernight && selectedRangeDate && selectedRangeDate.length === 2) {
      const [startDate, endDate] = selectedRangeDate;
      if (startDate?.isSame(endDate, 'day')) {
        setOverlapWarning('Start date and end date cannot be the same for overnight bookings.');
        return;
      }

      const selectedStart = timeRange[0].format('HH:mm');
      const selectedEnd = timeRange[1].format('HH:mm');

      const overlapExists = checkForOverlap(
        [startDate!.format('YYYY-MM-DD'), endDate!.format('YYYY-MM-DD')],
        selectedStart,
        selectedEnd
      );

      if (overlapExists) {
        setOverlapWarning('The selected time overlaps with an already booked slot on one of the selected days.');
        return;
      } else {
        setOverlapWarning(null);
      }
    } else if (date && timeRange) {
      const selectedDateStr = date.format('YYYY-MM-DD');
      const selectedStart = timeRange[0].format('HH:mm');
      const selectedEnd = timeRange[1].format('HH:mm');

      if (!isOvernight && dayjs(selectedStart, 'HH:mm').isAfter(dayjs(selectedEnd, 'HH:mm'))) {
        setOverlapWarning('Start time cannot be after end time for same-day bookings.');
        return;
      }

      const duration = dayjs(selectedEnd, 'HH:mm').diff(dayjs(selectedStart, 'HH:mm'), 'hour');
      if (duration < 1) {
        setOverlapWarning('The booking duration must be at least 1 hour for same-day bookings.');
        return;
      }

      const overlapExists = checkForOverlap(selectedDateStr, selectedStart, selectedEnd);

      if (overlapExists) {
        setOverlapWarning('The selected time overlaps with an already booked slot.');
        return;
      } else {
        setOverlapWarning(null);
      }
    }

    calculateTotalBill(values);
    console.log('Form values:', values);
    setSelectedRangeDate(null);
    setSelectedDate(null);
    setTotalBill(0);
    form.resetFields();
  };

  const extraServices = [
    { label: 'WiFi', value: 'wifi', price: 5 },
    { label: 'Café', value: 'cafe', price: 10 },
    { label: 'Parking', value: 'parking', price: 15 }
  ];

  const calculateTotalBill = (values: any) => {
    const { timeRange, extraServices: selectedServices } = values;
    let total = 0;

    if (timeRange) {
      const selectedStart = dayjs(timeRange[0].format('YYYY-MM-DD HH:mm'), 'YYYY-MM-DD HH:mm');
      const selectedEnd = dayjs(timeRange[1].format('YYYY-MM-DD HH:mm'), 'YYYY-MM-DD HH:mm');
      const durationInHours = selectedEnd.diff(selectedStart, 'hour', true);
      total += durationInHours;
    }

    if (selectedServices) {
      selectedServices.forEach((service: string) => {
        const extraService = extraServices.find((s) => s.value === service);
        if (extraService) {
          total += extraService.price;
        }
      });
    }

    setTotalBill(total);
  };

  const checkForOverlap = (selectedDateStr: string | string[], start: string, end: string): boolean => {
    if (Array.isArray(selectedDateStr)) {
      const [firstDay, secondDay] = selectedDateStr;

      const firstDaySlots = bookedSlots.find((slot) => slot.date === firstDay)?.slots || [];
      const firstDayOverlap = checkForSlotOverlap(start, end, firstDaySlots);

      const secondDaySlots = bookedSlots.find((slot) => slot.date === secondDay)?.slots || [];
      const secondDayOverlap = checkForSlotOverlap(start, end, secondDaySlots);

      return firstDayOverlap || secondDayOverlap;
    } else {
      const bookedForSelectedDate = bookedSlots.find((slot) => slot.date === selectedDateStr);
      return bookedForSelectedDate ? checkForSlotOverlap(start, end, bookedForSelectedDate.slots) : false;
    }
  };

  const checkForSlotOverlap = (start: string, end: string, slots: Slot[]): boolean => {
    const selectedStart = dayjs(start, 'HH:mm');
    const selectedEnd = dayjs(end, 'HH:mm');

    return slots.some((slot) => {
      const bookedStart = dayjs(slot.start, 'HH:mm');
      const bookedEnd = dayjs(slot.end, 'HH:mm');
      return selectedStart.isBefore(bookedEnd) && selectedEnd.isAfter(bookedStart);
    });
  };

  const getDisabledHours = (): number[] => {
    const storeOpenHour = dayjs(storeOpenTime, 'HH:mm').hour();
    const storeCloseHour = dayjs(storeCloseTime, 'HH:mm').hour();

    return Array.from({ length: 24 }, (_, i) => i).filter((hour) => {
      return hour < storeOpenHour || hour >= storeCloseHour;
    });
  };

  const getDisabledMinutes = (hour: number): number[] => {
    const storeOpenHour = dayjs(storeOpenTime, 'HH:mm').hour();
    const storeCloseHour = dayjs(storeCloseTime, 'HH:mm').hour();
    const storeOpenMinute = dayjs(storeOpenTime, 'HH:mm').minute();
    const storeCloseMinute = dayjs(storeCloseTime, 'HH:mm').minute();

    if (hour === storeOpenHour) {
      return Array.from({ length: storeOpenMinute }, (_, i) => i);
    }

    if (hour === storeCloseHour) {
      return Array.from({ length: 60 - storeCloseMinute - 1 }, (_, i) => storeCloseMinute + 1 + i);
    }

    return [];
  };

  const disablePastDates = (current: Dayjs) => {
    return current.isBefore(dayjs().startOf('day'), 'day');
  };

  const onValuesChange = (changedValues: any) => {
    console.log('form doi', changedValues);
    calculateTotalBill(form.getFieldsValue());
  };

  return (
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
      <Form
        form={form}
        onFinish={handleSubmit}
        onValuesChange={onValuesChange}
        layout='vertical'
        className='shadow-xl border-[#647C6C] bg-[#e5dbcf] p-5 w-full h-[600px] overflow-auto'
      >
        <div className='text-2xl font-paytoneone text-center text-[#647C6C] mb-4'>Your Reservation</div>
        <Form.Item>
          <Checkbox onChange={handleBookingTypeChange}>Overnight Booking</Checkbox>
        </Form.Item>

        {!isOvernight ? (
          <>
            <Form.Item label='Select Date' name='date' rules={[{ required: true, message: 'Please select a date' }]}>
              <DatePicker onChange={handleDateChange} format='YYYY-MM-DD' disabledDate={disablePastDates} />
            </Form.Item>
            <Form.Item
              label='Select Time Range'
              name='timeRange'
              rules={[{ required: true, message: 'Please select a time range' }]}
            >
              <TimeRangePicker
                className='w-full'
                format='HH:mm'
                disabledHours={getDisabledHours}
                disabledMinutes={getDisabledMinutes}
                minuteStep={15}
              />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              label='Select Date and Time Range'
              name='timeRange'
              rules={[{ required: true, message: 'Please select a date and time range' }]}
            >
              <DateTimeRangePicker
                format='YYYY-MM-DD HH:mm'
                showTime={{ format: 'HH:mm' }}
                onChange={handleRangeDateChange}
                disabledDate={disablePastDates}
              />
            </Form.Item>
          </>
        )}
        {selectedDate && !isOvernight && (
          <Form.Item>
            <Typography.Title level={4}>Booked Slots on {selectedDate.format('YYYY-MM-DD')}</Typography.Title>
            <Space direction='vertical'>
              {bookedSlots
                .find((slot) => slot.date === selectedDate.format('YYYY-MM-DD'))
                ?.slots.map((slot, index) => (
                  <Typography.Text key={index}>
                    {slot.start} - {slot.end}
                  </Typography.Text>
                ))}
            </Space>
          </Form.Item>
        )}
        {overlapWarning && (
          <Form.Item>
            <Alert message={overlapWarning} type='warning' />
          </Form.Item>
        )}
        <Form.Item label='Extra Services' name='extraServices' className='w-full'>
          <Checkbox.Group>
            <Space direction='vertical'>
              {extraServices.map((service) => (
                <Checkbox key={service.value} value={service.value}>
                  {service.label} - ${service.price}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <div className='h-[1px] w-full bg-[#647C6C] my-4'></div>
          <div className='flex justify-between items-center text-xl '>
            <div className='font-medium'>Total Bill: </div>
            <div className='font-bold'>${totalBill.toFixed(2)}</div>
          </div>
        </Form.Item>
        <Button type='primary' htmlType='submit' size='large' className='text-white w-full'>
          Book Now
        </Button>

        {selectedRangeDate && isOvernight && (
          <>
            {selectedRangeDate.map((date) => (
              <Form.Item key={date?.format('YYYY-MM-DD')}>
                <Typography.Title level={4}>Booked Slots on {date?.format('YYYY-MM-DD')}</Typography.Title>
                <Space direction='vertical'>
                  {bookedSlots
                    .find((slot) => slot.date === date?.format('YYYY-MM-DD'))
                    ?.slots.map((slot, index) => (
                      <Typography.Text key={index}>
                        {slot.start} - {slot.end}
                      </Typography.Text>
                    ))}
                </Space>
              </Form.Item>
            ))}
          </>
        )}
      </Form>
    </ConfigProvider>
  );
};

export default BookingForm;
