package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/yamato0204/go-react-app/app/entity"
	"github.com/yamato0204/go-react-app/app/usecase"
)

type Controller interface {

	Signup(c echo.Context) error

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