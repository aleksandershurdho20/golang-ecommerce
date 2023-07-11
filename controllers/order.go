package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"ecommerce/app/models"
)

func CreateOrder(c *gin.Context) {
	var order models.Order
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error_message": err.Error()})
		return
	}

	err := order.Save()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error_message": "Server error!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success_message": "Order created successfully"})
}

func GetOrdersByClientID(c *gin.Context) {
	id := c.Param("id")

	orders, err := models.GetOrdersByClientID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error_message": "Server error!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"orders": orders})
}

func GetAllOrders(c *gin.Context) {
	orders, err := models.GetOrders()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error_message": "Server error!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"orders": orders})
}