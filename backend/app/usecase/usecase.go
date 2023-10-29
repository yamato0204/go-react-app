package usecase

import (
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"path/filepath"

	"os"

	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"

	"github.com/yamato0204/go-react-app/app/entity"
	"github.com/yamato0204/go-react-app/app/infra"
)


type Usecase interface {
	
	Signup(user entity.User) (entity.UserResponse, error)
	Login(user entity.User,c echo.Context) (string,string, error)

	CreateRecord(article entity.Records) (entity.RecordsResponse, error)
	GetSession(c echo.Context, CookieKey string)(string, error)
	GetRecordMemo(userId string) ([]entity.RecordsMemoResponse, error)
	GetChartData(userId string) ([]entity.ChartDataResponse, error)
	GetPieChartData(userId string) ([]entity.ChartPieDataResponse, error)
	GetTodayDuration(userId string) (entity.TodayDurationResponse, error)
	GetUserData(userId string)(string, []entity.RecordsMemoResponse, error)
	GetUsers() ([]entity.UserPageResponse, error)

    GetWeekDuration(userId string)  (entity.WeekDurationResponse, error)
	GetRankingData() ([]entity.RankingDataResponse, error) 
	CreateCategory(category entity.Categories) (entity.CategoriesCreateResponse, error)
	GetCategories(userId string) ([]entity.CategoriesResponse, error)

	ImageFileUp(c echo.Context) error
} 

type usecase struct {
	sh  infra.SqlHandler
	rh  infra.RedisHandler
}

func NewUsecase(sh infra.SqlHandler, rh infra.RedisHandler) Usecase {
	return &usecase{
		sh,
	    rh,
	}
}



func (u *usecase)Signup(user entity.User) (entity.UserResponse, error) {	
	
	// err := u.sh.GetUserByEmail(&user, user.Email);
	// if err == nil {
	// 	return entity.UserResponse{}, err
	// }
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return entity.UserResponse{}, err
	}

	newUser := entity.User{
		ID: uuid.New().String(),
		Email: user.Email,
		Password: string(hash),
		Name: user.Name,
	}
		
	err = u.sh.CreateUser(&newUser)
	if err != nil {
		return entity.UserResponse{}, err
	}

	resUser := entity.UserResponse{
		ID: newUser.ID,
		Email: newUser.Email,
	}
	return resUser, err
}

func (u *usecase) Login(user entity.User, c echo.Context) (string,string, error) {

	storeUser := entity.User{}
	if err := u.sh.GetUserByEmail(&storeUser, user.Email); err != nil {
		return "", "", err
	}

	err := bcrypt.CompareHashAndPassword([]byte(storeUser.Password), []byte(user.Password))
	if err != nil {
		return "", "", err
	}
	cookieKey := "loginUserIdKey"
	redisKey , _ := u.rh.NewSession(c, storeUser.ID)
	//cokkieに格納する値を返す
	//newSessionの返り値を返し、controllerでcookieに格納
	return cookieKey, redisKey, nil
}

func (u *usecase) CreateRecord(record entity.Records) (entity.RecordsResponse, error) {

	record.ID = uuid.New().String()
	

	err := u.sh.CreateRecord(&record);  
	if err != nil {
		return entity.RecordsResponse{}, err
	}

	resRecord := entity.RecordsResponse{
		Memo: record.Memo,
	}

	return resRecord, err
}

func(u *usecase) GetSession(c echo.Context, CookieKey string)(string, error) {
	 cookie, err := c.Cookie(CookieKey); 
	 if err != nil {
		return "", err
	 }
	redisKey := cookie.Value

	redisValue, err :=   u.rh.GetSession(c,redisKey)
	if err != nil {
		return "", err
	}
	return redisValue, nil
	//  cookie, err := c.Cookie(CookieKey); 
	//  if err != nil {
	// 	return "", err
	//  }
	//redisKey := cookie.Value

	//全レコード取得
	//レコード登録
	//レコード削除
	//
}

func(u *usecase) GetRecordMemo(userId string) ([]entity.RecordsMemoResponse, error) {
	record := []entity.Records{}

	
	if err := u.sh.GetRecordMemo(&record, userId);  err != nil {
		return nil, err
	}


	resRecord := []entity.RecordsMemoResponse{}
	for _, v := range record {

		name, err :=  u.sh.GetCategoryNameById(v.CategoryId)

		if  err != nil {
			return []entity.RecordsMemoResponse{}, err
		}

		day := v.CreatedAt.Format("2006-01-02")

		t := entity.RecordsMemoResponse{
			ID: v.ID,
			Memo: v.Memo,
			Duration: v.Duration,
			UserId: v.UserId,
			CreatedAt: day,
			Name: name,
		}

		resRecord = append(resRecord, t)
	}
	return resRecord, nil
} 

func (u *usecase) GetUserData(userId string )(string, []entity.RecordsMemoResponse, error) {

	record := []entity.Records{}

	userName, err := u.sh.GetUserName(userId); 
	if err != nil {
		return "", []entity.RecordsMemoResponse{}, err
	}
	fmt.Println(userName)

	u.sh.GetRecordMemo(&record, userId)


resRecord := []entity.RecordsMemoResponse{}
	for _, v := range record {

		name, err :=  u.sh.GetCategoryNameById(v.CategoryId)

		if  err != nil {
			return "", []entity.RecordsMemoResponse{}, err
		}

		day := v.CreatedAt.Format("2006-01-02")

		t := entity.RecordsMemoResponse{
			ID: v.ID,
			Memo: v.Memo,
			Duration: v.Duration,
			UserId: v.UserId,
			CreatedAt: day,
			Name: name,
		}

		resRecord = append(resRecord, t)
	}


	return  userName, resRecord,  nil


}

func (u *usecase) GetChartData(userId string) ([]entity.ChartDataResponse, error){

	ResDatas := []entity.ChartDataResponse{}
	//今日取得 => where = 今日の分データ取得
	loc, err := time.LoadLocation("Asia/Tokyo")
    if err != nil {
        return []entity.ChartDataResponse{}, err
    }
	today := time.Now().In(loc)
	
	for i := 0; i < 7; i++ {
		date := today.AddDate(0, 0, -i)
		day := date.Format("2006-01-02")//2020-10-04
		
		data := []entity.ResRecords{}
	    err = u.sh.GetChartData(&data, day, userId)
		
		// [{duration : 20, categoryId : 323232 },{},{} ]
		for _, ChartData := range data {
			
		
			durationInHours := float64(ChartData.Total_duration) / 60.0
			Res := entity.Categories{}
			u.sh.GetDataByCategoryId(&Res, ChartData.CategoryId)

			ResDatas = append(ResDatas, entity.ChartDataResponse{
			Day: day,
			Duration: durationInHours,
			Name: Res.Name,
			Color_r: Res.Color_r,
			Color_g: Res.Color_g,
			Color_b: Res.Color_b,
			Color_a: Res.Color_a,
			 } )
		}	
		if err != nil {
			return []entity.ChartDataResponse{}, err
		}

		 //durationInHours := float64() / 60.0
		 ResDatas = append(ResDatas, entity.ChartDataResponse{
		 	Day: day,
		 	} )
		
	}
	return ResDatas, nil
}

func (u *usecase) GetTodayDuration(userId string) (entity.TodayDurationResponse, error) {

	ResData := entity.TodayDurationResponse{}
	loc, err := time.LoadLocation("Asia/Tokyo")
    if err != nil {
        return entity.TodayDurationResponse{}, err
    }
    // 現在の日本時間を取得
    today := time.Now().In(loc)

	day := today.Format("2006-01-02")
	
	totalDulation, err := u.sh.GetTodayDuration(day, userId)
	if err != nil {
		return entity.TodayDurationResponse{}, err
	}


	 hours, minutes := convertMinutesToHoursAndMinutes(totalDulation)

	 ResData.Hour = hours
	 ResData.Minute = minutes

	 return ResData, nil
	

}

func (u *usecase) GetWeekDuration(userId string) (entity.WeekDurationResponse, error) {

	ResData := entity.WeekDurationResponse{}
	loc, err := time.LoadLocation("Asia/Tokyo")

    if err != nil {
        return entity.WeekDurationResponse{}, err
    }
    // 現在の日本時間を取得
    today := time.Now().In(loc)
	weekAgo := today.AddDate(0, 0, -6)
	weekAgo = time.Date(weekAgo.Year(), weekAgo.Month(), weekAgo.Day(), 0, 0, 0, 0, loc)
	totalDulation, err := u.sh.GetWeekDuration(weekAgo, today, userId)

	 if err != nil {
		return entity.WeekDurationResponse{}, err
	 }
	 hours, minutes := convertMinutesToHoursAndMinutes(totalDulation)

	 ResData.Hour = hours
	 ResData.Minute = minutes
	 return ResData, nil
}

func convertMinutesToHoursAndMinutes(minutes int) (int, int) {
    hours := minutes / 60
    remainingMinutes := minutes % 60
    return hours, remainingMinutes
}

func (u *usecase) GetUsers() ([]entity.UserPageResponse, error) {

	users := []entity.User{}

	if err := u.sh.GetUser(&users);  err != nil {
		return nil, err
	}

	resUsers := []entity.UserPageResponse{}
	for _, v := range users {
		t := entity.UserPageResponse{
			ID: v.ID,
			Name: v.Name,

		}

		resUsers = append(resUsers, t)
	}
	return resUsers, nil
}

func (u *usecase) GetRankingData() ([]entity.RankingDataResponse, error) {

	//現在時刻取得
	//一週間の期間の中で、最もdurationの多いuserを三人取得(userId)

	//リファクタ可

	rankData := []entity.GetRankingData{}
	
	loc, err := time.LoadLocation("Asia/Tokyo")

    if err != nil {
        return []entity.RankingDataResponse{}, err
    }
    // 現在の日本時間を取得
    today := time.Now().In(loc)
	weekAgo := today.AddDate(0, 0, -6)
	weekAgo = time.Date(weekAgo.Year(), weekAgo.Month(), weekAgo.Day(), 0, 0, 0, 0, loc)

	
	if err := u.sh.GetRankingData(&rankData, weekAgo, today); err != nil {
		return []entity.RankingDataResponse{} ,err
	}


	//res =  GetRankingUser()

	res := []entity.RankingDataResponse{}
	for _, v := range rankData {

		 hours, minutes :=convertMinutesToHoursAndMinutes(v.Duration)
		t := entity.RankingDataResponse{
			UserID: v.UserID,
			Hour: hours,
			Minute: minutes,
			Name: v.Name,

		}

		res = append(res, t)
	}

	
return res , nil

	//三人分　Getdurationweek

}





func (u *usecase) CreateCategory(category entity.Categories) (entity.CategoriesCreateResponse, error) {

	category.ID = uuid.New().String()
	r, g, b, a := generateRandomRGBA()

	category.Color_r = r
	category.Color_g = g
	category.Color_b = b
	category.Color_a = a

	err := u.sh.CreateCategory(&category);  
	if err != nil {
		return entity.CategoriesCreateResponse{}, err
	}
	resRecord := entity.CategoriesCreateResponse{
		Name: category.Name,
	}
	return resRecord, err
}


func generateRandomRGBA() (r, g, b, a int) {
	// シード値を現在のUnix時間で初期化
	seed := time.Now().UnixNano()
	random := rand.New(rand.NewSource(seed))

	r = random.Intn(256) // 0から255のランダムな整数を生成
	g = random.Intn(256)
	b = random.Intn(256)
	a = random.Intn(256)

	return r, g, b, a
}
	
func (u *usecase) GetCategories(userId string) ([]entity.CategoriesResponse, error) {
	category := []entity.Categories{}

	if err := u.sh.GetCategories(&category, userId);  err != nil {
		return nil, err
	}

	resCategory := []entity.CategoriesResponse{}
	for _, v := range category {
		t := entity.CategoriesResponse{
			ID: v.ID,
			Name: v.Name,
			Color_r: v.Color_r,
			Color_g: v.Color_g,
			Color_b: v.Color_b,
			Color_a: v.Color_a,
		}

		resCategory = append(resCategory, t)
	}
	
	
	return resCategory, nil
}


func (u *usecase)GetPieChartData(userId string) ([]entity.ChartPieDataResponse, error) {

	ResDatas := []entity.ChartPieDataResponse{}
	
	// categoryごとのdurationの合計時間取得
	// categoryの名前取得

	Data := []entity.PieDataSum{}
	if err := u.sh.GetPieData(&Data, userId);  err != nil {
		return []entity.ChartPieDataResponse{}, err
	}

	// {1, 20} {2, 35} {3, 45}
	
	for _, v := range Data {

		category := entity.Categories{}
		if err := u.sh.GetCategoryData(&category, userId, v.Category_id); err != nil {
			return []entity.ChartPieDataResponse{}, err
		}
	
		t := entity.ChartPieDataResponse{
			Name: category.Name,
			Color_r: category.Color_r,
			Color_g: category.Color_g,
			Color_b: category.Color_b,
			Color_a: category.Color_a,
			Amount : v.SumDuration,
		}

		ResDatas = append(ResDatas, t)
	}

		

		
		// [{duration : 20, categoryId : 323232 },{},{} ]
		

	return ResDatas, nil

}

func (u *usecase )ImageFileUp(c echo.Context)  error{

	r := c.Request()

	file, fileHeader, err := r.FormFile("file")

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	defer file.Close()

	err = os.MkdirAll("./uploadfiles", os.ModePerm)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	buff := make([]byte, 512)
	_, err = file.Read(buff)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	filetype := http.DetectContentType(buff)
	if filetype != "image/jpeg" && filetype != "image/png" {
		return echo.NewHTTPError(http.StatusBadRequest, "JPEG、または、PNGでアップロードしてください。")
	}

	_, err = file.Seek(0, io.SeekStart)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	filename := fmt.Sprintf("%d%s", time.Now().UnixNano(), filepath.Ext(fileHeader.Filename))
	fmt.Println(filename)

	// Create file using generated filename
	dst, err := os.Create(fmt.Sprintf("./uploadfiles/%s", filename))

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	defer dst.Close()

	_, err = io.Copy(dst, file)
	
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return nil
}