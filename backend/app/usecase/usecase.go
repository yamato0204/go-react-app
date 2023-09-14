package usecase

import (
	

	"github.com/google/uuid"

	"github.com/yamato0204/go-react-app/app/entity"
	"github.com/yamato0204/go-react-app/app/infra"
)


type Usecase interface {
	
	Signup(user entity.User) (entity.UserResponse, error)
	
}

type usecase struct {
	i infra.Infra
}

func NewUsecase(i infra.Infra) Usecase {
	return &usecase{i}
}



func (u *usecase)Signup(user entity.User) (entity.UserResponse, error) {

	
	err := u.i.GetUserByEmail(&user, user.Email)
	if err == nil {
		return entity.UserResponse{}, err
	}

	newUser := entity.User{
		ID: uuid.New().String(),
		Email: user.Email,
		Password: user.Password}
	
	
	err = u.i.CreateUser(&newUser)
	if err != nil {
		return entity.UserResponse{}, err
	}

	resUser := entity.UserResponse{
		ID: newUser.ID,
		Email: newUser.Email,
	}

	return resUser, err
	
	
}




	




