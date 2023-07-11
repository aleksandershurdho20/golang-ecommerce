package controllers
import (
	"net/http"

	"github.com/gin-gonic/gin"
	"ecommerce/app/models"

)

type CreateProductRequest struct {
	Title       string `json:"title" binding:"required"`
	Price       int    `json:"price" binding:"required"`
	Quantity    int    `json:"quantity" binding:"required"`
	Description string `json:"description" binding:"required"`
	Category    string `json:"category" binding:"required"`
}


func CreateProduct(c *gin.Context) {
	var req CreateProductRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error_message": err.Error()})
		return
	}

	product := models.Product{
		Title:       req.Title,
		Price:       req.Price,
		Quantity:    req.Quantity,
		Description: req.Description,
		Category:    req.Category,
	}

	err := product.Save()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error_message": "Server error!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success_message": "Product created succesfully!"})
}


func GetProducts(c *gin.Context) {
	products, err := models.GetAllProductsFromDB()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error_message": "Server error!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"products": products})
}

func DeleteProduct(c *gin.Context) {
	productID := c.Param("id")

	err := models.DeleteProduct(productID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error_message": "Server error!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success_message": "Product deleted successfully"})
}

func GetProduct(c *gin.Context) {
	productID := c.Param("id")

	product, err := models.GetAProduct(productID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error_message": "Server error!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"product": product})
}