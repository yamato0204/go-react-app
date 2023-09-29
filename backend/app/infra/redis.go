package infra

import (
	"net/http"
	"time"

	
	"github.com/go-redis/redis/v8"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)




type redisHandler struct {
	client *redis.Client
}

type RedisHandler interface {
	NewSession(c echo.Context, redisValue string) (string, error)
	GetSession(c echo.Context, CookieKey string)(string, error)
	DeleteSession(c echo.Context, cookieKey string) 

}


func NewRedisHandler() RedisHandler {
	client := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "",
		DB:       0,
	})
	return &redisHandler{client}
}

// //client := redis.NewClient(&redis.Options{
// 		Addr:     "redis:6379",
// 		Password: "",
// 		DB:       0,
// 	})

func (r *redisHandler)NewSession(c echo.Context, redisValue string) (string, error) {
	//b := make([]byte, 64)
	redisKey := uuid.New().String()
	// if _, err := io.ReadFull(uuid, b); err != nil {
	// 	panic("ランダムな文字作成時にエラーが発生しました。")
	// }
	if err := r.client.Set(r.client.Context(), redisKey ,redisValue,0).Err(); err != nil {
		return "", err
	}

	// cookie := new(http.Cookie)
	// cookie.Name = cookieKey
	// cookie.Value = redisKey
	// cookie.Expires = time.Now().Add(24 * time.Hour)
    // c.SetCookie(cookie)

	return redisKey, nil
}
//0f018422-652a-4bb3-b1b2-463c142c0803

func (r *redisHandler)GetSession(c echo.Context, redisKey string)(string, error) {
	
	//  cookie, err := c.Cookie(CookieKey); 
	//  if err != nil {
	// 	return "", err
	//  }
	//redisKey := cookie.Value
	
	redisValue, err := r.client.Get(r.client.Context(), redisKey).Result()

	if err != nil {
		return "",err
	}
	
	return redisValue, err	
		
}


func (r *redisHandler)DeleteSession(c echo.Context, cookieKey string)   {

cookie, _ := c.Cookie(cookieKey)

redisId := cookie.Value

	r.client.Del(r.client.Context(), redisId)
	//c.SetCookie(cookieKey, "", -1, "/", "localhost", false, false)

	cookie = new(http.Cookie)
	cookie.Name = cookieKey
	cookie.Value = ""
	cookie.Expires = time.Now()
 c.SetCookie(cookie)
}