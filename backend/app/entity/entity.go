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
	CategoryId string   `json:"category_id" gorm:"not null"`

}

type RecordsMemoResponse struct {
	ID  string   `json:"id"`
	Memo string  `json:"memo"`
	Duration int  `json:"duration,string"`
	CreatedAt time.Time `json:"created_at"`
	UserId    string    `json:"user_id" gorm:"not null"`

}

type ChartGetData struct {
	Duration float64 
	CategoryId string 
}

type ChartDataResponse struct {
	ID string `json:"id"`
	Duration float64  `json:"duration,string"`
	Day string  `json:"day"`
	Name     string    `json:"name"`
	Color_r  int  `json:"color_r"` 
    Color_g  int  `json:"color_g"`
    Color_b  int  `json:"color_b"` 
    Color_a  int  `json:"color_a"`  
}

type WeekDurationResponse struct {
	Hour int `json:"hour,string"`
	Minute int `json:"minutes,string"`
}

type TodayDurationResponse struct {
	Hour int `json:"hour,string"`
	Minute int `json:"minutes,string"`
}

 type RankingDataResponse struct {
	UserID string  `json:"user_id" gorm:"not null"`
	Name string  `json:"name"`
	Hour int  `json:"hour,string"`
	Minute int  `json:"minutes,string"`

 }

 type GetRankingData struct {
	UserID string
	Duration int
	Name string
 }

//  type Categories struct {
// 	ID  string  `json:"id"`
// 	Name string  `json:"name"`
// 	ColorCode ColorCode `json:"color_code"`
// 	UserId    string    `json:"user_id" gorm:"not null"`
//  }


//  type ColorCode struct {
// 	R int `json:"r"`
// 	G int `json:"g"`
// 	B int `json:"b"`
// 	A int `json:"a"`
// }



type Categories struct {
	ID       string    `json:"id"`
	Name     string    `json:"name"`
	Color_r  int  `json:"color_r"` 
    Color_g  int  `json:"color_g"`
    Color_b  int  `json:"color_b"` 
    Color_a  int  `json:"color_a"`    
	UserId   string    `json:"user_id" gorm:"not null"`
}

 type CategoriesCreateResponse struct {
	Name string  `json:"name"`
	
 }
 
 type CategoriesResponse struct {
	ID  string  `json:"id"` 
	Name     string    `json:"name"`
	Color_r  int  `json:"color_r"` 
    Color_g  int  `json:"color_g"`
    Color_b  int  `json:"color_b"` 
    Color_a  int  `json:"color_a"`  
 }

 type CategoryResById struct {

	Name     string    `json:"name"`
	Color_r  int  `json:"color_r"` 
    Color_g  int  `json:"color_g"`
    Color_b  int  `json:"color_b"` 
    Color_a  int  `json:"color_a"`  
 }

 type ResRecords struct {
	Total_duration int 
	CategoryId string
 }  