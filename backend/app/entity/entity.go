package entity

import "time"


type User struct {
	ID        string     `json:"id"`
	Email     string    `json:"email" gorm:"unique"`
	Password  string    `json:"password"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}


type UserResponse struct {
	ID    string   `json:"id"`
	Email string `json:"email"`
	Name string `json:"name"`
}

type UserPageResponse struct {
	ID    string   `json:"id"`
	Name string `json:"name"`
}

type Article struct {
	ID    string  `json:"id"`
	Title string  `json:"title"`
	Body  string  `json:"body"`
	User      User      `json:"user" gorm:"foreignKey:UserId; constraint:OnDelete:CASCADE"`
	UserId    string    `json:"user_id" gorm:"not null"`
}

type ArticleResponse struct {
	ID    string  `json:"id"`
	Title string  `json:"title"`
}

type RecordsResponse struct {
	
	Memo string  `json:"memo"`
}

type Records struct {
	ID  string   `json:"id"`
	Memo string  `json:"memo"`
	Duration int  `json:"duration,string"`
	CreatedAt time.Time `json:"created_at"`
	UserId    string    `json:"user_id" gorm:"not null"`

}

type RecordsMemoResponse struct {
	ID  string   `json:"id"`
	Memo string  `json:"memo"`
	Duration int  `json:"duration,string"`
	CreatedAt time.Time `json:"created_at"`
	UserId    string    `json:"user_id" gorm:"not null"`

}

type ChartDataResponse struct {
	ID string `json:"id"`
	Duration float64  `json:"duration,string"`
	Day string  `json:"day"`
}

type WeekDurationResponse struct {
	Hour int `json:"hour,string"`
	Minute int `json:"minutes,string"`
}

//  type RankingDataResponse struct {
// 	Ranking int `json:"ranking,string"`
// 	ID    string   `json:"id"`
// 	Name string `json:"name"`
// 	Hour int `json:"hour,string"`
// 	Minute int `json:"minutes,string"`

//  }

 type RankingDataResponse struct {
	UserID string
	Duration int
	Name string

 }

 type GetRankingData struct {
	UserID string
	Duration int
	Name string
 }