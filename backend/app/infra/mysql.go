package infra

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/yamato0204/go-react-app/app/entity"
	"gorm.io/gorm"
)

type SqlHandler interface {
	
	CreateUser(user *entity.User) error
	GetUserByEmail(user *entity.User, email string) error
	CreateRecord(record *entity.Records) error
	GetRecordMemo(record *[]entity.Records, userId string) error 
	GetChartData( day string, userId string) (int ,error)
	GetTodayDuration(day string,userId string ) (int , error)

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
	
loc, err := time.LoadLocation("Asia/Tokyo")
    if err != nil {
        return  err
    }

    // 現在の日本時間を取得
    today := time.Now().In(loc)

	//day := today.Format("2006-01-02")
	fmt.Println(today)

	//jst := time.FixedZone("Asia/Tokyo", 9*60*60) // 日本標準時のオフセットは9時間
	record.CreatedAt = today
	
	
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

 func (s *sqlHandler)GetChartData(day string, userId string) (int, error) {
	// var totalDuration int

	// if err := s.db.Model(&entity.Records{}).Where("DATE(created_at) = ?","2023-10-24").Select("SUM(duration) as total_duration").Scan(&totalDuration).Error; err != nil {
	// 	return 0 ,err
	// }

	// return totalDuration , nil
	var totalDuration sql.NullInt64

	if err := s.db.Model(&entity.Records{}).Where("DATE(created_at) = ? AND user_id = ?", day, userId).Select("SUM(duration) as total_duration").Scan(&totalDuration).Error; err != nil {
		return 0, err
	}

	if totalDuration.Valid {
		return int(totalDuration.Int64), nil
	}

	return 0, nil
 }


 func (s *sqlHandler)GetTodayDuration(day string,userId string ) (int , error) {

	var totalDuration sql.NullInt64

	if err := s.db.Model(&entity.Records{}).Where("DATE(created_at) = ? AND user_id = ?", day, userId).Select("SUM(duration) as total_duration").Scan(&totalDuration).Error; err != nil {
		return 0, err
	}

	if totalDuration.Valid {
		return int(totalDuration.Int64), nil
	}

	return 0, nil
 }