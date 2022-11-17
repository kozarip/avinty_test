import React, {useState} from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Calendar from './components/calendar';
import './styles/App.scss';

const App = () => {

  const [date, setDate] = useState(new Date())

  return (
    <div className="App">
      <div className='appointmentContainer'>
        <h1>Please select a day!</h1>
        <Calendar
          date={date}
        />
      </div>
    </div>
  );
}

export default App;
