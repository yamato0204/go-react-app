package usecase

import (
	

	
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
	err := u.sh.GetUserByEmail(&user, user.Email)
	if err == nil {
		return entity.UserResponse{}, err
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return entity.UserResponse{}, err
	}

	newUser := entity.User{
		ID: uuid.New().String(),
		Email: user.Email,
		Password: string(hash)}
		
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
		t := entity.RecordsMemoResponse{
			ID: v.ID,
			Memo: v.Memo,
			Duration: v.Duration,
			UserId: v.UserId,
			CreatedAt: v.CreatedAt,

		}

		resRecord = append(resRecord, t)
	}
	return resRecord, nil
} 





	




