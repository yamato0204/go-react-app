package main

import (
	"log"

	"github.com/yamato0204/go-react-app/app/controller"
	"github.com/yamato0204/go-react-app/app/infra"
	"github.com/yamato0204/go-react-app/app/router"
	"github.com/yamato0204/go-react-app/app/usecase"
	
)

func main() {

	db := infra.NewDB()
	sh := infra.NewInfra(db)
	rh := infra.NewRedisHandler()
	usecase := usecase.NewUsecase(sh, rh)
	controller := controller.NewController(usecase)


	e := router.NewRouter(controller)

	err := e.Start(":8080")
	if err != nil{
		log.Fatal(err)
	}
}
