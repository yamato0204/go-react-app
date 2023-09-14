package router

import (
	"github.com/labstack/echo/v4"
	"github.com/yamato0204/go-react-app/app/controller"
)

func NewRouter(c controller.Controller) *echo.Echo{

	e := echo.New()


	e.POST("/signup", c.Signup)

	return e
}