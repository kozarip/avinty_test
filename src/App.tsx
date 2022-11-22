import React, {useEffect, useState} from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Calendar from './components/calendar/calendar';
import appointments from './assets/avinty_front_end_resource.json';
import moment from 'moment';
import './styles/App.scss';
import { AppointmentType, durationType } from './utils/types';

const App = () => {
  const [date, setDate] = useState(new Date())
  const [currentAppointments, setCurrentAppointments] = useState<AppointmentType[] | []>([])

  useEffect(() => {
    const closestDate = getClosestDate()
    setDate(closestDate)
    setCurrentAppointments(selectCurrentAppointments(closestDate));
  }, [])

  const selectCurrentAppointments = (selectedDate: any) => {
    return appointments.events.filter(appointment => (
      moment(appointment.start).format("YYYY-MM-DD") === moment(selectedDate).format("YYYY-MM-DD")
      || moment(appointment.end).format("YYYY-MM-DD") === moment(selectedDate).format("YYYY-MM-DD")
    ))
  }

  const getClosestDate = () => {
    const today = moment(new Date())
    let minDurationDate = ""
    let minDuration = moment.duration(today.diff(moment(appointments.events[0].start))).asDays()
    appointments.events.forEach((appointment: AppointmentType) => {
      var duration = moment.duration(today.diff(moment(appointment.start))).asDays();
      if (duration < minDuration) {
        minDuration = duration
        minDurationDate = appointment.start
      }
    });
    return new Date(minDurationDate)
  }

  return (
    <div className="App">
      <div className='appointmentContainer'>
        <h1>Please select a day!</h1>
        <DatePicker
          className='datePicker'
          label="Date"
          value={date}
          onChange={(newDate: any) => {
            setDate(newDate);
            setCurrentAppointments(selectCurrentAppointments(newDate));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Calendar
          date={date}
          appointments={currentAppointments}
        />
      </div>
    </div>
  );
}

export default App;
