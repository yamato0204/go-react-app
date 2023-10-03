package infra

import (
	"github.com/yamato0204/go-react-app/app/entity"
	"gorm.io/gorm"
)

type SqlHandler interface {
	
	CreateUser(user *entity.User) error
	GetUserByEmail(user *entity.User, email string) error
	CreateRecord(record *entity.Records) error
	GetRecordMemo(record *[]entity.Records, userId string) error 
}

type sqlHandler struct {
	db *gorm.DB
}


func NewInfra(db *gorm.DB) SqlHandler {
	return &sqlHandler{db} //暗黙的　構造体を返す
}




func  (s *sqlHandler)CreateUser(user *entity.User) error {
	if err := s.db.Create(user).Error; err != nil {
		return err
	}
	return nil
}

func (s *sqlHandler)GetUserByEmail(user *entity.User, email string) error {
	if err := s.db.Where("email=?", email).First(user).Error; err != nil {
		return err
	}
	return nil
 }

 func (s *sqlHandler)CreateRecord(record *entity.Records) error {
	if err := s.db.Create(record).Error; err != nil {
		return err
	}
	return nil
 }

 func (s *sqlHandler)GetRecordMemo(record *[]entity.Records, userId string) error {
	if err := s.db.Joins("User").Where("user_id=?", userId).Order("created_at").Find(record).Error; err != nil {
		return err
	}
	return nil
 }