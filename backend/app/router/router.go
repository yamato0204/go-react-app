package router

import (
	

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/yamato0204/go-react-app/app/controller"
)

func NewRouter(c controller.Controller) *echo.Echo{

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept,
			echo.HeaderAccessControlAllowHeaders, echo.HeaderXCSRFToken},
		AllowMethods:     []string{"GET", "PUT", "POST", "DELETE"},
		AllowCredentials: true,
	}))
	

	e.POST("/register", c.Signup)
	e.POST("/login", c.Login)
	e.GET("/cookie", c.GetCookie)
	e.GET("/chartData", c.GetChartData)
	e.GET("/todayDuration", c.GetTodayDuration)
	e.GET("/weekDuration", c.GetWeekDuration)
	e.GET("/rankingData", c.GetRankingData)
	e.GET("/PieChartData", c.GetPieChartData)

	e.POST("edit/post", c.EditPost)

	t := e.Group("/record")
	t.GET("/get", c.GetRecordMemo)
	t.POST("/create", c.CreateRecord)
	
	u := e.Group("/user")
	u.GET("/get", c.GetUsers)
	u.GET("/chart", c.GetUser)
	u.GET("/show", c.GetUserData)

	ca := e.Group("/category")
	ca.GET("/get", c.GetCategory)
	ca.POST("/create", c.CreateCategory)



//レコード関連

	// h := e.Group("record")
	// h.GET("G", c.GetRecordData)
	// h


	return e
}