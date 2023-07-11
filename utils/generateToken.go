package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

var jwtSecret = []byte("your_jwt_secret") 

func GenerateToken(userID string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = userID
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix() 

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})
	if err != nil {
		return "", err
	}

	// Verify the token's signature method
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return "", jwt.ErrSignatureInvalid
	}

	// Get the user ID from the token's claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if userID, ok := claims["user_id"].(string); ok {
			return userID, nil
		}
	}

	return "", jwt.ErrInvalidKey
}