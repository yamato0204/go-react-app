package router

import (
	"github.com/labstack/echo/v4"
	"github.com/yamato0204/go-react-app/app/controller"
)

func NewRouter(c controller.Controller) *echo.Echo{

	e := echo.New()
	e.POST("/signup", c.Signup)
	e.POST("/login", c.Login)


	t := e.Group("/tasks")
	t.POST("", c.CreateArticle)


//レコード関連

	h := e.Group("record")
	h.GET("G", c.GetRecordData)
	h


	return e
}