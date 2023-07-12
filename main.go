package main

import (
	"github.com/gin-gonic/gin"
	"ecommerce/app/controllers"
	"ecommerce/app/utils"
	"github.com/gin-contrib/cors"

)

func main() {
	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	router.Use(cors.New(config))

     err := utils.InitDatabase("mongodb://localhost:27017/ecommerce")
	if err != nil {
		panic(err)
	}

	router.POST("/register", controllers.SignUpController)
	router.POST("/login", controllers.SignInController)
	router.POST("/product/create", controllers.CreateProduct)
	router.GET("/products", controllers.GetProducts)
	router.GET("/product/:id", controllers.GetProduct)
	router.DELETE("/product/:id", controllers.DeleteProduct)
	router.PUT("/update/product/:id", controllers.UpdateProduct)
	router.POST("/order", controllers.CreateOrder)
	router.GET("/orders", controllers.GetAllOrders)
	router.GET("/orders/client/:id", controllers.GetOrdersByClientID)

	router.Run(":8080")
	defer utils.Session.Close()
}