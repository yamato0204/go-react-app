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
	GetChartData(Data *[]entity.ResRecords, day string, userId string) error 
	GetTodayDuration(day string,userId string ) (int , error)
	GetWeekDuration(beforeDay time.Time, today time.Time, userId string )(int, error) 
	GetUser(user *[]entity.User)  error
	GetRankingData(RankData *[]entity.GetRankingData , beforeDay time.Time, today time.Time) error
	CreateCategory(category *entity.Categories) error
	GetCategories(categories *[]entity.Categories, userId string) error
	GetDataByCategoryId(category *entity.Categories,  Id string) error

	GetCategoryNameById(categoryId string) (string, error)
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

 func (s *sqlHandler)GetChartData(Data *[]entity.ResRecords, day string, userId string) error {
	if err := s.db.Table("records").
		Select("category_id, SUM(duration) as total_duration").
		Where("DATE(created_at) = ? AND user_id = ?", day, userId).
		Group("category_id").
		Scan(&Data).Error; err != nil {
		return  err
	}

	return  nil
 }


 func (s *sqlHandler)GetTodayDuration(day string,userId string ) (int , error) {

	var totalDuration sql.NullInt64

	if err := s.db.Model(&entity.Records{}).Where("DATE(created_at) = ? AND user_id = ?", day, userId).Select("SUM(duration) as total_duration").
	Scan(&totalDuration).Error; err != nil {
		return 0, err
	}

	if totalDuration.Valid {
		return int(totalDuration.Int64), nil
	}

	return 0, nil
 }

 func (s *sqlHandler) GetWeekDuration(beforeDay time.Time, today time.Time, userId string )(int,  error) {
	var total_duration int

	if err := s.db.Model(&entity.Records{}).Select("SUM(duration) as total_duration").
	Where("user_id = ? AND created_at BETWEEN ? AND ?", userId, beforeDay, today).
	Scan(&total_duration).Error; err != nil {
		return 2, err
	}

	return total_duration, nil

 }


 func(s *sqlHandler) GetRankingData(RankData *[]entity.GetRankingData, beforeDay time.Time, today time.Time) error {

// 	if err := s.db.Table("records r").Select("u.name as user_name, r.user_id, SUM(r.duration) as total_duration").
// 	Joins("INNER JOIN users u ON r.user_id = u.id").
// 	Where("r.created_at BETWEEN ? AND ?", beforeDay, today).
// 	Group("r.user_id").
// 	Order("total_duration DESC").
// 	Limit(3).
//     Scan(&RankData).Error; err != nil {
// 		return err
// 	}	

// 	return nil
//  }

if err := s.db.Table("records r").Select("u.name as Name, r.user_id as UserID, SUM(r.duration) as Duration").
	Joins("INNER JOIN users u ON r.user_id = u.id").
	Where("r.created_at BETWEEN ? AND ?", beforeDay, today).
	Group("r.user_id").
	Order("Duration DESC").
	Limit(3).
	Scan(&RankData).Error; err != nil {
	return err
}

return nil
 }


 func (s *sqlHandler) GetUser(user *[]entity.User) error {
	if err := s.db.Order("created_at desc").Find(&user).Error; err != nil {
		return err
	}
	return nil
 }



func (s *sqlHandler)CreateCategory(category *entity.Categories) error {
	
	if err := s.db.Create(category).Error; err != nil {
		return err
	}
	return nil
 }

 
 func (s *sqlHandler)GetCategories(categories *[]entity.Categories, userId string) error {
	if err := s.db.Where("user_id=?", userId).Find(categories).Error; err != nil {
		return err
	}
	return nil
 }

 func (s *sqlHandler)GetDataByCategoryId(category *entity.Categories,  Id string) error {

	if err := s.db.Where("id=?",Id ).First(&category).Error; err != nil {
		return err
	}

	return nil
 }

 func (s * sqlHandler)GetCategoryNameById(categoryId string) (string, error) {

	var name string
	if err := s.db.
	Model(&entity.Categories{}).
	Where("id=?", categoryId).
	Select("name").
	Scan(&name).Error; err != nil {
		return "", err
	}

	return name, nil
 }