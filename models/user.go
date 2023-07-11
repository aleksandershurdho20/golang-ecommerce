package models

import (
	"time"
	"ecommerce/app/utils"
	"gopkg.in/mgo.v2/bson"
)

type User struct {
	ID       bson.ObjectId `bson:"_id,omitempty" json:"_id"`
	Username string        `bson:"username" json:"username"`
	Email    string        `bson:"email" json:"email"`
	Password string        `bson:"password" json:"-"`
	Role     string        `bson:"role" json:"role"`
	CreatedAt time.Time     `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time     `bson:"updated_at" json:"updated_at"`
}

func (u *User) Save() error {
	u.ID = bson.NewObjectId()
	u.CreatedAt = time.Now()
	u.UpdatedAt = time.Now()

	session := utils.GetDBSession()
	defer session.Close()

	return session.DB("ecommerce").C("users").Insert(u)
}

func FindUserByEmail(email string) (*User, error) {
	session := utils.GetDBSession()
	defer session.Close()

	var user User
	err := session.DB("ecommerce").C("users").Find(bson.M{"email": email}).One(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func DoesEmailExist(email string) bool {
	session := utils.GetDBSession()
	defer session.Close()

	count, _ := session.DB("ecommerce").C("users").Find(bson.M{"email": email}).Count()
	return count > 0
}