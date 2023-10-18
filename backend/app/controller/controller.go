package controller

import (
	"fmt"
	"net/http"

	"time"

	"github.com/labstack/echo/v4"
	"github.com/yamato0204/go-react-app/app/entity"
	"github.com/yamato0204/go-react-app/app/usecase"
)

type Controller interface {

	Signup(c echo.Context) error
	Login(c echo.Context) error
	GetCookie(c echo.Context) error
	GetRecordMemo(c echo.Context) error
	CreateRecord(c echo.Context) error
	GetChartData(c echo.Context) error
	GetTodayDuration(c echo.Context) error
	GetUsers(c echo.Context)error
	GetUser(c echo.Context) error
	GetWeekDuration(c echo.Context) error
}

type controller struct {
	u usecase.Usecase
}

func NewController(c usecase.Usecase) Controller {
	return &controller{c}
}

func (cc *controller) Signup(c echo.Context) error {
	user := entity.User{}
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	userRes, err := cc.u.Signup(user)


	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusCreated, userRes)
}

func (cc *controller) Login(c echo.Context) error {

	user := entity.User{}
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	
	
	cookieKey, redisKey, err := cc.u.Login(user, c)
	if err != nil {
		return err
	}

	cookie := new(http.Cookie)
	cookie.Name = cookieKey
	cookie.Value = redisKey
	cookie.Expires = time.Now().Add(24 * time.Hour)
	//cookie.Secure = true
	cookie.HttpOnly = true
	cookie.Path = "/"
	cookie.Domain = "localhost"
	//cookie.SameSite = http.SameSiteNoneMode
     c.SetCookie(cookie)

	return c.String(http.StatusOK, cookie.Name)
}

func (cc *controller)CreateRecord(c echo.Context) error {

// sessionがあるのか確認
record := entity.Records{}
  if err :=  c.Bind(&record); err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
  }

  cookieKey := "loginUserIdKey"
  userId, err := cc.u.GetSession(c,cookieKey)
  if err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
  }

  fmt.Println(userId)

   fmt.Println(err)
//cookieからsessionIDを取り出し、userIDを取得
 
 record.UserId = userId
 RecordRes, err := cc.u.CreateRecord(record)

  if err != nil {
	return c.JSON(http.StatusInternalServerError, err.Error())
  }

  return c.JSON(http.StatusCreated, RecordRes)

}

func (cc *controller)GetCookie(c echo.Context) error {
	_, err := c.Cookie("loginUserIdKey")

	if err != nil {
		return c.String(http.StatusOK, "NoCookie")
	}

	//fmt.Println(cookie.Value)
	
	return c.String(http.StatusOK, "read a cookie")

}

func (cc *controller)GetRecordMemo(c echo.Context) error {

	cookieKey := "loginUserIdKey"
  userId, err := cc.u.GetSession(c,cookieKey)
  fmt.Println(userId)
  if err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
  }
  resRecord, err := cc.u.GetRecordMemo(userId)

  fmt.Println(err)
  if err != nil {
	return c.JSON(http.StatusInternalServerError, err.Error())
  }

  return c.JSON(http.StatusOK, resRecord)
}

func (cc *controller)GetChartData(c echo.Context) error {
  cookieKey := "loginUserIdKey"
  userId, err := cc.u.GetSession(c,cookieKey)
  fmt.Println(userId)
  if err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
  }
  resChartData, err := cc.u.GetChartData(userId)
  return c.JSON(http.StatusOK, resChartData)
}

func (cc *controller)GetTodayDuration(c echo.Context) error {
	cookieKey := "loginUserIdKey"
  userId, err := cc.u.GetSession(c,cookieKey)
  fmt.Println(userId)
  if err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
  }
  resdata , err :=  cc.u.GetTodayDuration(userId)

  if err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
	
  }

  return c.JSON(http.StatusOK, resdata)

}

func (cc *controller) GetWeekDuration(c echo.Context) error {

	cookieKey := "loginUserIdKey"
  userId, err := cc.u.GetSession(c,cookieKey)
  if err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
  }

  resdata , err :=  cc.u.GetWeekDuration(userId)

  if err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
	
  }

  return c.JSON(http.StatusOK, resdata)

}
func (cc *controller)GetUsers(c echo.Context)error {


// 		cookieKey := "loginUserIdKey"
//   userId, err := cc.u.GetSession(c,cookieKey)
//   fmt.Println(userId)
//   if err != nil {
// 	return c.JSON(http.StatusBadRequest, err.Error())
//   }
  resUsers, err := cc.u.GetUsers()

  fmt.Println(err)
  if err != nil {
	return c.JSON(http.StatusInternalServerError, err.Error())
  }

  return c.JSON(http.StatusOK, resUsers)
}

func (cc *controller)GetUser(c echo.Context) error {
	userId := c.QueryParam("ID")

	resChartData, err := cc.u.GetChartData(userId) 
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, resChartData)


}


