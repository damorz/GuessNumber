package main

import (
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()

	server.Use(cors.Default())
	var randomNumber = rand.Intn(6)

	server.POST("/isauth", VerifyToken)

	server.POST("/login", Login)

	server.GET("/guess", func(ctx *gin.Context) {

		var guessNumber, err = strconv.Atoi(ctx.Query("guessNumber"))
		var status = 202
		if err != nil {
			return
		}
		if randomNumber == guessNumber {
			status = 201
			randomNumber = rand.Intn(5)
		} else {
			status = 202
		}
		ctx.JSON(status, gin.H{
			"guessNumber": guessNumber,
		})
	})

	server.Run(":3000")
}

type User struct {
	ID       uint64 `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

// Sample user
var user = User{
	ID:       1,
	Username: "demoUser",
	Password: "password",
}

func CreateToken(userid uint64) (string, error) {
	var err error

	//Creating Token
	// os.Setenv("ACCESS_SECRET", "jdnfksdmfksd") //this should be in an env file
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["user_id"] = userid
	atClaims["exp"] = time.Now().Add(time.Minute * 5).Unix()
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	token, err := at.SignedString([]byte(os.Getenv("ACCESS_SECRET")))
	if err != nil {
		return "", err
	}
	return token, nil
}

func Login(ctx *gin.Context) {
	var u User
	if err := ctx.ShouldBindJSON(&u); err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, "Invalid json provided")
		return
	}

	//compare (demo user) and (request user)
	if user.Username != u.Username || user.Password != u.Password {
		ctx.JSON(http.StatusUnauthorized, "Please provide valid login details")
		return
	}

	token, err := CreateToken(user.ID)
	if err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, token)
}

func VerifyToken(ctx *gin.Context) {
	tokenString := ctx.Query("jwt_token")
	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("ACCESS_SECRET")), nil
	})

	if err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, token.Valid)
}

// func TokenValid(r *http.Request) error {
// 	token, err := VerifyToken(r)
// 	if err != nil {
// 		return err
// 	}
// 	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
// 		return err
// 	}
// 	return nil
// }
