export type AppointmentType = {
  color: string
  end: string
  id: number
  start: string
  title?: string | undefined
  location?: string | undefined
  registered?: boolean | undefined
}

export type durationType = {
  days: number
  date: string
}