package infra

import (
	"database/sql"

	"github.com/yamato0204/go-react-app/app/entity"
	"gorm.io/gorm"
)

type SqlHandler interface {
	
	CreateUser(user *entity.User) error
	GetUserByEmail(user *entity.User, email string) error
	CreateRecord(record *entity.Records) error
	GetRecordMemo(record *[]entity.Records, userId string) error 
	GetChartData( day string) (int ,error)
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
	if err := s.db.Where("user_id=?", userId).Order("created_at").Find(record).Error; err != nil {
		return err
	}
	return nil
 }

 func (s *sqlHandler)GetChartData(day string) (int, error) {
	// var totalDuration int

	// if err := s.db.Model(&entity.Records{}).Where("DATE(created_at) = ?","2023-10-24").Select("SUM(duration) as total_duration").Scan(&totalDuration).Error; err != nil {
	// 	return 0 ,err
	// }

	// return totalDuration , nil
	var totalDuration sql.NullInt64

	if err := s.db.Model(&entity.Records{}).Where("DATE(created_at) = ?", day).Select("SUM(duration) as total_duration").Scan(&totalDuration).Error; err != nil {
		return 0, err
	}

	if totalDuration.Valid {
		return int(totalDuration.Int64), nil
	}

	return 0, nil
 }