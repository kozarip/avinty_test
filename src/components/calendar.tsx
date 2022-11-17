import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import "./calendar.scss"
import moment from 'moment';
import { AppointmentType, ConvertedAppointmentType } from '../utils/types';

type CalendarProps = {
  date: any
  appointments: AppointmentType[]
}

const Calendar: React.FC<CalendarProps> = ({ date, appointments }) => {
  useEffect(() => {
  }, [appointments])

  const convertAppointmentsDate2Quarters = (rawAppointments: AppointmentType[]) => {
    const convertedAppointments = rawAppointments.map((appointment: any) => {
      const startQuarter = convertTimeToQuarters(appointment.start)
      const endQuarter = convertTimeToQuarters(appointment.end)
      appointment["startQuarter"] = startQuarter
      appointment["endQuarter"] = endQuarter
      return appointment
    })
    console.log(convertedAppointments)
    return convertedAppointments
  }

  const convertTimeToQuarters = (time: any) => {
    return (moment.duration(moment(time).format('HH:mm')).asMinutes() / 15)
  }

  const renderQuarters = () => {
    let tr = [];
    const convertedAppointments = convertAppointmentsDate2Quarters(appointments)
    for (let i = 1; i <= 96; i++) {
      const appointmentsInThisTime =
        convertedAppointments.filter((convertedAppointment) => convertedAppointment.startQuarter === i)
      let div = []
      const isHour = i % 4 === 0
      const appointmentsNumber = appointmentsInThisTime.length
      if (appointmentsNumber === 0) {
        tr.push(<div className={`empty ${isHour ? 'isHour' : ''}`}>{isHour && i / 4}</div>)
      } else {
        let reservedPlacesNumber = 0
        div = appointmentsInThisTime.map((a: ConvertedAppointmentType) => {
          const width = 100 / appointmentsNumber
          const height =
            a.endQuarter < a.startQuarter
              ? 96 - a.startQuarter
              : a.endQuarter - a.startQuarter
          reservedPlacesNumber = height > 1 ? height : 0
          //reservedPlacesNumber += appointmentsNumber;
          return (
            <div className='calendarItem' style={{
                width: `${width}%`,
                height: `${height * 30}px`
              }}>
              {`${moment(a.start).format('HH:mm')} - ${moment(a.end).format('HH:mm')}`}
              {reservedPlacesNumber}
            </div>
          )
        })
        i += reservedPlacesNumber
        tr.push(div)
      }
    }
    return tr;
  }

  return (
    <div className='calendarContainer'>
      {renderQuarters()}
    </div>
  );
};

export default Calendar;