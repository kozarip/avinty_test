import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AppointmentType } from '../utils/types';
import moment from 'moment';
import { WEATHER_API_KEY } from '../utils/constants';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type AppointmentProps = {
  appointment: AppointmentType
}

const initWeather = {
  name: "",
  main: { temp: 0 },
  weather: [{description: ""}]
}

const AppointmentDetails: React.FC<AppointmentProps> = ({ appointment }) => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [weather, setWeather] = useState(initWeather);
  const [isUseCurrentPosition, setIsUseCurrentPosition] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (appointment.location) {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${appointment.location}&appid=${WEATHER_API_KEY}`)
          .then(res => res.json())
          .then(result => {
            setLat(result[0].lat)
            setLon(result[0].lon)
          });
      } else {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          setIsUseCurrentPosition(true)
        });
      }
      if (lat && lon) {
        await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
        });
      }
    }
    fetchData();
  }, [lat, lon])
  return (
    <Box
      sx={style}
    >
      {appointment.title && <h3>{appointment.title}</h3>}
      <div>
        {`${moment(appointment.start).format("HH:mm")} - ${moment(appointment.end).format("HH:mm")}`}
      </div>
      {appointment.location && <div>{appointment.location}</div>}
      {weather && <>
        <h4>Weather</h4>
        <div>{isUseCurrentPosition && <span>(Event location is not available, use your current position)</span>}</div>
        <div>{`Temperature: ${weather.main.temp} °C`}</div>
        <div>{`Weather: ${weather.weather[0].description}`}</div>
      </>}
    </Box>
  );
};

export default AppointmentDetails;