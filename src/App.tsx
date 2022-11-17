import React, {useEffect, useState} from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Calendar from './components/calendar';
import appointments from './assets/avinty_front_end_resource.json';
import moment from 'moment';
import './styles/App.scss';
import { AppointmentType } from './utils/types';

const App = () => {
  const [date, setDate] = useState(new Date("2021-07-26"))
  const [currentAppointments, setCurrentAppointments] = useState<AppointmentType[] | []>([])

  useEffect(() => {
    setCurrentAppointments(selectCurrentAppointments(date));
  }, [])

  const selectCurrentAppointments = (selectedDate: any) => {
    return appointments.events.filter(appointment => (
      moment(appointment.start).format("YYYY-MM-DD") === moment(selectedDate).format("YYYY-MM-DD")
      || moment(appointment.end).format("YYYY-MM-DD") === moment(selectedDate).format("YYYY-MM-DD")
    ))
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
