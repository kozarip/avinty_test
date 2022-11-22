/* eslint-disable no-loop-func */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AppointmentType } from '../../utils/types';
import "./calendar.scss"
import { Modal, Button } from '@mui/material';
import AppointmentDetails from '../appointmentDetails/appointmentDetails';
import { colors } from '../../utils/theme';

type CalendarProps = {
  date: any
  appointments: AppointmentType[]
}

const Calendar: React.FC<CalendarProps> = ({ date, appointments }) => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentType>(appointments[0])


  const renderAppointments = () => {
    return appointments.map((appointment: AppointmentType, i) => {
      let start = moment(appointment.start).format("HHmm")
      let end = moment(appointment.end).format("HHmm")
      //handle midnight events
      if (parseInt(moment(appointment.start).format("DD")) < parseInt(moment(appointment.end).format("DD"))) {
        if (parseInt(moment(appointment.start).format("DD")) === parseInt(moment(date).format("DD"))) {
          end = "2400"
        } else {
          start = "0000"
        }
      }

      //find and count same time appointments
      const sameTime = appointments.filter((other: AppointmentType) => {
        if (appointment.id === other.id) return false;
        const start = Date.parse(appointment.start)
        const end = Date.parse(appointment.end)
        const otherStart = Date.parse(other.start)
        const otherEnd = Date.parse(other.end)
        if (otherStart < start && start < otherEnd) return true;
        if (otherStart < end && end < otherEnd) return true;
        if (start < otherEnd && otherEnd < end) return true;
        if (start < otherStart && otherStart < end) return true;
        if(otherStart === start && end === otherEnd) return true
        return false;
      })
      //widths for appointments
      let timeCssClass = ""
      if (sameTime.length === 0) {
        timeCssClass = "fullWidth"
      } else if (sameTime.length === 1) {
        timeCssClass = "halfWidth"
      } else if (sameTime.length === 3) {
        timeCssClass = "thirdWidth"
      }
      return (
        <div
          className={`calendarItem ${timeCssClass}`}
          key={appointment.id}
          style={{
            gridRow: `time-${start} / time-${end}`,
            backgroundColor: colors[appointment.color]
          }}
          onClick={() => handleClickOnAppointment(appointment)}
        >
          <span>
          {`${moment(appointment.start).format("HH:mm")} - ${moment(appointment.end).format("HH:mm")}`}
          </span>
          {appointment.title && <h4>{appointment.title}</h4>}
        </div>
      )
    })
  }

  const handleClickOnAppointment = (appointment: AppointmentType) => {
    setIsAppointmentModalOpen(true)
    setSelectedAppointment(appointment)
  }

  const convertIntoTwoDigits = (number: number) => {
    return (number < 10) ? '0' + number.toString() : number.toString();
  }

  const renderHours = () => {
    const html = []
    for (let i = 1; i < 24; i++){
      html.push(<h5 key={i} style={
        { gridRow: `time-${convertIntoTwoDigits(i - 1)}00 / time-${convertIntoTwoDigits(i)}00` }
      }>
        {convertIntoTwoDigits(i-1)}:00
      </h5>)
    }
    return html
  }

  return (
    <div className='calendarContainer'>
      <div className='schedule'>
        {
          <>
            {renderHours()}
            {renderAppointments()}
          </>
        }
      </div>
      <Modal
        open={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <AppointmentDetails
            appointment={selectedAppointment}
          />
        </>
      </Modal>
    </div>
  );
};

export default Calendar;