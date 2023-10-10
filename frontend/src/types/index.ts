export type Credential = {
  email: string
  password: string
}

export type Register = {
  email: string
  password: string
  name: string
}


export type Record = {
    id: string
    memo: string
    duration: number
}

export type ChartData = {
  id: string
  duration: number
  day: string
}

export type TodayDuration = {
  duration: number
}

export type UserData = {
  name: string
}