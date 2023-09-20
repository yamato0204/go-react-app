package usecase

import (
	"os"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"

	"github.com/yamato0204/go-react-app/app/entity"
	"github.com/yamato0204/go-react-app/app/infra"
)


type Usecase interface {
	
	Signup(user entity.User) (entity.UserResponse, error)
	Login(user entity.User,c echo.Context) (string,string, error)
	
}

type usecase struct {
	sh  infra.SqlHandler
	rh  infra.RedisHandler
}

func NewUsecase(sh infra.SqlHandler, rh infra.RedisHandler) Usecase {
	return &usecase{
		sh,
	    rh}
}



func (u *usecase)Signup(user entity.User) (entity.UserResponse, error) {	
	err := u.sh.GetUserByEmail(&user, user.Email)
	if err == nil {
		return entity.UserResponse{}, err
	}

	newUser := entity.User{
		ID: uuid.New().String(),
		Email: user.Email,
		Password: user.Password}
		
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

	cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
	 redisKey , _ := u.rh.NewSession(c, storeUser.ID)
	//cokkieに格納する値を返す


	//newSessionの返り値を返し、controllerでcookieに格納
	return cookieKey, redisKey, nil
}




	




