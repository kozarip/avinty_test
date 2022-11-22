import React from 'react';
import Calendar from './calendar';
import { render, screen } from '@testing-library/react';
import appointments from '../../assets/avinty_front_end_resource.json';

it('render correct appointment', () => {
  render(<Calendar
    appointments={appointments.events}
    date={new Date("2021-07-27")}
  />);
  expect(
    screen.getAllByText('Quo minus animus a se ipse dissidens secumque discordans gustare partem.')[0])
    .toBeInTheDocument();
});