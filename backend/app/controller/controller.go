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
	GetUserData(c echo.Context) error

	GetWeekDuration(c echo.Context) error
	GetRankingData(c echo.Context) error

	CreateCategory(c echo.Context) error
	GetCategory(c echo.Context) error

	GetPieChartData(c echo.Context) error

	EditPost(c echo.Context) error
	
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
  
  if err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
  }
  resRecord, err := cc.u.GetRecordMemo(userId)

  
  if err != nil {
	return c.JSON(http.StatusInternalServerError, err.Error())
  }

  return c.JSON(http.StatusOK, resRecord)
}

func (cc *controller)GetChartData(c echo.Context) error {
  cookieKey := "loginUserIdKey"
  userId, err := cc.u.GetSession(c,cookieKey)
 // fmt.Println(userId)
  if err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
  }
  resChartData, err := cc.u.GetChartData(userId)
  return c.JSON(http.StatusOK, resChartData)
}

func (cc *controller)GetTodayDuration(c echo.Context) error {
	cookieKey := "loginUserIdKey"
  userId, err := cc.u.GetSession(c,cookieKey)
  
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



func (cc *controller) GetUserData(c echo.Context) error {


	userId := c.QueryParam("ID")

	resName, resRecord, err := cc.u.GetUserData(userId) 


	fmt.Println(resName)
	
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}


	response := struct {
		Name   string                   `json:"userName"`
		Record []entity.RecordsMemoResponse `json:"userRecord"`
	}{
		Name:   resName,
		Record: resRecord,
	}

	return c.JSON(http.StatusOK, response)


}



func (cc *controller)GetUsers(c echo.Context)error {


// 		cookieKey := "loginUserIdKey"
//   userId, err := cc.u.GetSession(c,cookieKey)
//   fmt.Println(userId)
//   if err != nil {
// 	return c.JSON(http.StatusBadRequest, err.Error())
//   }
  resUsers, err := cc.u.GetUsers()

  
  if err != nil {
	return c.JSON(http.StatusInternalServerError, err.Error())
  }

  return c.JSON(http.StatusOK, resUsers)
}

func (cc *controller)GetUser(c echo.Context) error {
	userId := c.QueryParam("ID")

	resData, err := cc.u.GetChartData(userId) 

	//resData2,err := cc.u.GetUserName(userId)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	// response := map[string]interface{}{
	// 	"chartData": resData,
	// 	"userData":  resData2,
	// }

	return c.JSON(http.StatusOK, resData)


}

func (cc *controller ) GetRankingData(c echo.Context) error {

	resRankingData, err := cc.u.GetRankingData() 
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, resRankingData)
	
	} 


func (cc *controller) CreateCategory(c echo.Context) error {


	category := entity.Categories{}
  if err :=  c.Bind(&category); err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
  }

  cookieKey := "loginUserIdKey"
  userId, err := cc.u.GetSession(c,cookieKey)
  if err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
  }

//cookieからsessionIDを取り出し、userIDを取得
 
 category.UserId = userId
 CategoryRes, err := cc.u.CreateCategory(category)

  if err != nil {
	return c.JSON(http.StatusInternalServerError, err.Error())
  }

  return c.JSON(http.StatusCreated, CategoryRes)

}

func (cc *controller) GetCategory(c echo.Context) error{
  cookieKey := "loginUserIdKey"
  userId, err := cc.u.GetSession(c,cookieKey)
  
  if err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
  }
  resRecord, err := cc.u.GetCategories(userId)

  if err != nil {
	return c.JSON(http.StatusInternalServerError, err.Error())
  }

  return c.JSON(http.StatusOK, resRecord)

}

func (cc *controller) GetPieChartData(c echo.Context) error {
	cookieKey := "loginUserIdKey"
  userId, err := cc.u.GetSession(c,cookieKey)
  fmt.Println(userId)
  if err != nil {
	return c.JSON(http.StatusBadRequest, err.Error())
  }
  resChartData, err := cc.u.GetPieChartData(userId)
  return c.JSON(http.StatusOK, resChartData)
}

func (cc *controller) EditPost(c echo.Context) error {

	if err := cc.u.ImageFileUp(c); err != nil {
		fmt.Println(err)
		return err
	}

	
	return c.String(200, "ok")
	
}



