package main

import (
	"github.com/gin-gonic/gin"
	"ecommerce/app/controllers"
	"ecommerce/app/utils"

)

func main() {
	router := gin.Default()

     err := utils.InitDatabase("mongodb://localhost:27017/ecommerce")
	if err != nil {
		panic(err)
	}

	router.POST("/signup", controllers.SignUpController)
	router.POST("/signin", controllers.SignInController)

	router.Run(":8080")
	defer utils.Session.Close()
}