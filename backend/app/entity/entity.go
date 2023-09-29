package entity

import "time"


type User struct {
	ID        string     `json:"id"`
	Email     string    `json:"email" gorm:"unique"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}


type UserResponse struct {
	ID    string   `json:"id"`
	Email string `json:"email" gorm:"unique"`
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

type activity_records struct {
	ID  string
	Memo string
	duration int
	date int

}