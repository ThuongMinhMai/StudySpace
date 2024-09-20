import React, { useState } from 'react';
import { Form, DatePicker, TimePicker, Button, Typography, Space, Checkbox, message, Alert } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import 'antd/dist/reset.css';

const { RangePicker: TimeRangePicker } = TimePicker;
const { RangePicker: DateTimeRangePicker } = DatePicker;

interface Slot {
  start: string; // e.g., "10:00"
  end: string;   // e.g., "11:00"
}

interface BookingFormProps {
  storeOpenTime: string; // e.g., "09:00"
  storeCloseTime: string; // e.g., "18:00"
  bookedSlots: { date: string; slots: Slot[] }[]; // e.g., [{ date: "2024-09-20", slots: [{ start: "10:00", end: "11:00" }] }]
}

const BookingForm: React.FC<BookingFormProps> = ({ storeOpenTime, storeCloseTime, bookedSlots }) => {
  const [form] = Form.useForm();
  const [isOvernight, setIsOvernight] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedRangeDate, setSelectedRangeDate] = useState<Dayjs[] | null>(null); // For overnight
  const [overlapWarning, setOverlapWarning] = useState<string | null>(null); // State to track overlap warning

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleRangeDateChange = (rangeDates: Dayjs[] | null) => {
    setSelectedRangeDate(rangeDates);
  };

  const handleBookingTypeChange = (e: any) => {
    setOverlapWarning("");
    setIsOvernight(e.target.checked);
  };

  const handleSubmit = (values: any) => {
    const { date, timeRange } = values;

    if (isOvernight && selectedRangeDate && selectedRangeDate.length === 2) {
      const [startDate, endDate] = selectedRangeDate;
      if (startDate.isSame(endDate, 'day')) {
        setOverlapWarning('Start date and end date cannot be the same for overnight bookings.');
        return; // Prevent form submission
      }

      // Check for overlaps for both days
      const selectedStart = timeRange[0].format('HH:mm');
      const selectedEnd = timeRange[1].format('HH:mm');

      const overlapExists = checkForOverlap([startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')], selectedStart, selectedEnd);

      if (overlapExists) {
        setOverlapWarning('The selected time overlaps with an already booked slot on one of the selected days.');
        return; // Prevent form submission
      } else {
        setOverlapWarning(null); // Clear the warning if no overlap
      }
    } else if (date && timeRange) {
      const selectedDateStr = date.format('YYYY-MM-DD');
      const selectedStart = timeRange[0].format('HH:mm');
      const selectedEnd = timeRange[1].format('HH:mm');

      // Handle reverse time ranges for same-day bookings
      if (!isOvernight && dayjs(selectedStart, 'HH:mm').isAfter(dayjs(selectedEnd, 'HH:mm'))) {
        setOverlapWarning('Start time cannot be after end time for same-day bookings.');
        return; // Prevent form submission
      }

      const overlapExists = checkForOverlap(selectedDateStr, selectedStart, selectedEnd);

      if (overlapExists) {
        setOverlapWarning('The selected time overlaps with an already booked slot.');
        return; // Prevent form submission
      } else {
        setOverlapWarning(null); // Clear the warning if no overlap
      }
    }

    console.log('Form values:', values);
  };

  const checkForOverlap = (selectedDateStr: string | string[], start: string, end: string): boolean => {
    if (Array.isArray(selectedDateStr)) {
      // Overnight booking: check across both days
      const [firstDay, secondDay] = selectedDateStr;

      // Check first day slots
      const firstDaySlots = bookedSlots.find(slot => slot.date === firstDay)?.slots || [];
      const firstDayOverlap = checkForSlotOverlap(start, end, firstDaySlots);

      // Check second day slots
      const secondDaySlots = bookedSlots.find(slot => slot.date === secondDay)?.slots || [];
      const secondDayOverlap = checkForSlotOverlap(start, end, secondDaySlots);

      return firstDayOverlap || secondDayOverlap;
    } else {
      // Same-day booking
      const bookedForSelectedDate = bookedSlots.find(slot => slot.date === selectedDateStr);
      return bookedForSelectedDate
        ? checkForSlotOverlap(start, end, bookedForSelectedDate.slots)
        : false;
    }
  };

  const checkForSlotOverlap = (start: string, end: string, slots: Slot[]): boolean => {
    const selectedStart = dayjs(start, 'HH:mm');
    const selectedEnd = dayjs(end, 'HH:mm');

    return slots.some(slot => {
      const bookedStart = dayjs(slot.start, 'HH:mm');
      const bookedEnd = dayjs(slot.end, 'HH:mm');
      return selectedStart.isBefore(bookedEnd) && selectedEnd.isAfter(bookedStart);
    });
  };

  const getDisabledHours = (): number[] => {
    const storeOpenHour = dayjs(storeOpenTime, 'HH:mm').hour();
    const storeCloseHour = dayjs(storeCloseTime, 'HH:mm').hour();

    return Array.from({ length: 24 }, (_, i) => i).filter(hour => {
      return hour < storeOpenHour || hour >= storeCloseHour;
    });
  };

  const getDisabledMinutes = (hour: number): number[] => {
    const storeOpenHour = dayjs(storeOpenTime, 'HH:mm').hour();
    const storeCloseHour = dayjs(storeCloseTime, 'HH:mm').hour();
    const storeOpenMinute = dayjs(storeOpenTime, 'HH:mm').minute();
    const storeCloseMinute = dayjs(storeCloseTime, 'HH:mm').minute();

    if (hour === storeOpenHour) {
      return Array.from({ length: storeOpenMinute }, (_, i) => i); // Disable minutes before open time
    }

    if (hour === storeCloseHour) {
      return Array.from({ length: 60 - storeCloseMinute - 1 }, (_, i) => storeCloseMinute + 1 + i); // Disable minutes after close time
    }

    return [];
  };

  const disablePastDates = (current: Dayjs) => {
    return current.isBefore(dayjs().startOf('day'), 'day');
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item>
        <Checkbox onChange={handleBookingTypeChange}>Overnight Booking</Checkbox>
      </Form.Item>

      {!isOvernight ? (
        <>
          <Form.Item label="Select Date" name="date" rules={[{ required: true, message: 'Please select a date' }]}>
            <DatePicker
              onChange={handleDateChange}
              format="YYYY-MM-DD"
              disabledDate={disablePastDates}
            />
          </Form.Item>
          <Form.Item label="Select Time Range" name="timeRange" rules={[{ required: true, message: 'Please select a time range' }]}>
            <TimeRangePicker
              format="HH:mm"
              showTime={{ format: 'HH:mm' }}
              disabledHours={getDisabledHours}
              disabledMinutes={getDisabledMinutes}
              minuteStep={15}
            />
          </Form.Item>
        </>
      ) : (
        <>
          <Form.Item label="Select Date and Time Range" name="timeRange" rules={[{ required: true, message: 'Please select a date and time range' }]}>
            <DateTimeRangePicker
              format="YYYY-MM-DD HH:mm"
              showTime={{ format: 'HH:mm' }}
              onChange={handleRangeDateChange}
              disabledDate={disablePastDates}
            />
          </Form.Item>
        </>
      )}

      {overlapWarning && (
        <Form.Item>
          <Alert message={overlapWarning} type="warning" />
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">Book</Button>
      </Form.Item>

      {selectedDate && !isOvernight && (
        <Form.Item>
          <Typography.Title level={4}>Booked Slots on {selectedDate.format('YYYY-MM-DD')}</Typography.Title>
          <Space direction="vertical">
            {bookedSlots.find(slot => slot.date === selectedDate.format('YYYY-MM-DD'))?.slots.map((slot, index) => (
              <Typography.Text key={index}>
                {slot.start} - {slot.end}
              </Typography.Text>
            ))}
          </Space>
        </Form.Item>
      )}

      {selectedRangeDate && isOvernight && (
        <>
          {selectedRangeDate.map(date => (
            <Form.Item key={date.format('YYYY-MM-DD')}>
              <Typography.Title level={4}>Booked Slots on {date.format('YYYY-MM-DD')}</Typography.Title>
              <Space direction="vertical">
                {bookedSlots.find(slot => slot.date === date.format('YYYY-MM-DD'))?.slots.map((slot, index) => (
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
  );
};

export default BookingForm;
