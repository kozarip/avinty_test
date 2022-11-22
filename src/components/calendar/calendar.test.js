import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';s
import Calendar from './calendar';
import appointments from './assets/avinty_front_end_resource.json';

it('renders welcome message', () => {
  render(<Calendar
    appointments={appointments}
    date={new Date("2021-07-27")}
  />);
  expect(
    screen.getByText('Quo minus animus a se ipse dissidens secumque discordans gustare partem.'))
    .toBeInTheDocument();
});