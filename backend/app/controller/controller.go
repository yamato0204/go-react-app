package controller

import (
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/yamato0204/go-react-app/app/entity"
	"github.com/yamato0204/go-react-app/app/usecase"
)

type Controller interface {

	Signup(c echo.Context) error
	Login(c echo.Context) error

	CreateArticle(c echo.Context) error

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
    c.SetCookie(cookie)

	return c.NoContent(http.StatusOK)
}

func (cc *controller)CreateArticle(c echo.Context) error {

// sessionがあるのか確認
  cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
  userId, err := cc.u.GetSession(c,cookieKey)
  if err != nil {
	return c.JSON(http.StatusBadRequest, "")
  }

//cookieからsessionIDを取り出し、userIDを取得
  article := entity.Article{}
  article.UserId = userId
  articleRes, err := cc.u.CreateArticle(article)

  if err != nil {
	return c.JSON(http.StatusInternalServerError, err.Error())
  }

  return c.JSON(http.StatusCreated, articleRes)

}




