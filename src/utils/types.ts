export type AppointmentType = {
  color: string
  end: string
  id: number
  start: string
  title?: string | undefined
  location?: string | undefined
  registered?: boolean | undefined
}

export type ConvertedAppointmentType = {
  color: string
  end: string
  id: number
  start: string
  title?: string | undefined
  location?: string | undefined
  registered?: boolean | undefined
  startQuarter: number
  endQuarter: number
}
