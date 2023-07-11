package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"ecommerce/app/models"
	"ecommerce/app/utils"
	"golang.org/x/crypto/bcrypt"
)

type SignUpRequest struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type SignInRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

func SignUpController(c *gin.Context) {
	var req SignUpRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error_message": err.Error()})
		return
	}

	if models.DoesEmailExist(req.Email) {
		c.JSON(http.StatusBadRequest, gin.H{"error_message": "Email already exists"})
		return
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error_message": "Server error!"})
		return
	}

	user := models.User{
		Username: req.Username,
		Email:    req.Email,
		Password: string(hashedPassword),
	}
	err = user.Save()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error_message": "Server error!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success_message": "Registration success! Please sign in."})
}

func SignInController(c *gin.Context) {
	var req SignInRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error_message": err.Error()})
		return
	}

	user, err := models.FindUserByEmail(req.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error_message": "Invalid credentials"})
		return
	}

	// Compare passwords
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error_message": "Invalid credentials"})
		return
	}

	// Generate JWT token
	token, err := utils.GenerateToken(user.ID.Hex()) // Convert ObjectId to string
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error_message": "Server error!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"_id":      user.ID.Hex(),
			"username": user.Username,
			"email":    user.Email,
			"role":     user.Role,
		},
	})
}




