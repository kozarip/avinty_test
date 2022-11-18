/* eslint-disable no-loop-func */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AppointmentType, ConvertedAppointmentType } from '../utils/types';
import "./calendar.scss"
import { Modal, Button } from '@mui/material';
import AppointmentDetails from './appointmentDetails';

type CalendarProps = {
  date: any
  appointments: AppointmentType[]
}

const Calendar: React.FC<CalendarProps> = ({ date, appointments }) => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentType>(appointments[0])

  useEffect(() => {
    console.log(appointments)
  }, [appointments])

  const renderAppointments = () => {
    return appointments.map((appointment: AppointmentType, i) => {
      const start = moment(appointment.start).format("HHmm")
      const end = moment(appointment.end).format("HHmm")
      return (
        <div
          className='calendarItem'
          key={appointment.id}
          style={{ gridRow: `time-${start} / time-${end}` }}
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

  return (
    <div className='calendarContainer'>
      <div className='schedule'>
        {/* <h5 style={{gridRow: "time-0800"}}>8:00</h5>
        <h5 style={{gridRow: "time-0900"}}>9:00</h5>
        <h5 style={{gridRow: "time-1000"}}>10:00</h5>
        <h5 style={{gridRow: "time-1100"}}>11:00</h5>
        <h5 style={{gridRow: "time-1200"}}>12:00</h5>
        <h5 style={{gridRow: "time-1300"}}>13:00</h5>
        <h5 style={{gridRow: "time-1400"}}>14:00</h5>
        <h5 style={{gridRow: "time-1500"}}>15:00</h5>
        <h5 style={{gridRow: "time-1600"}}>16:00</h5>
        <h5 style={{gridRow: "time-1700"}}>17:00</h5>
        <h5 style={{gridRow: "time-1800"}}>18:00</h5>
        <h5 style={{gridRow: "time-1900"}}>19:00</h5>
        <h5 style={{gridRow: "time-2000"}}>20:00</h5>
        <h5 style={{gridRow: "time-2100"}}>21:00</h5>
        <h5 style={{gridRow: "time-2200"}}>22:00</h5>
        <h5 style={{gridRow: "time-2300"}}>23:00</h5> */}
        {/* <h5 className='rowBorder' style={{gridRow: "time-0900"}}></h5> */}
        {renderAppointments()}
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