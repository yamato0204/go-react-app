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

export type WeekDuration = {
  hour: number;
  minutes: number;
}

export type UserData = {
  id: number
  name: string
}

export type UserID = {
  id: number
}

export type RankingData = {
  user_id: number
   hour: number;
  minutes: number;
  name: string
  

}
