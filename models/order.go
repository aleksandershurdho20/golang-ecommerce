package models


import (
	"time"
	"ecommerce/app/utils"
	"log"
    "gopkg.in/mgo.v2/bson"


)
type Order struct {
	ID        bson.ObjectId `bson:"_id,omitempty" json:"_id"`
	UserID    bson.ObjectId `bson:"user_id" json:"user_id"`
	Products  []Product  `bson:"products" json:"products"`
	Address  	string     `bson:"address" json:"address"`
	Phone  	int     `bson:"phone" json:"phone"`
	Total     int           `bson:"total" json:"total"`
	CreatedAt time.Time     `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time     `bson:"updated_at" json:"updated_at"`
}

func (order *Order) Save() error {
	order.ID = bson.NewObjectId()
	order.CreatedAt = time.Now()
	order.UpdatedAt = time.Now()

	session := utils.GetDBSession()
	defer session.Close()

	return session.DB("ecommerce").C("orders").Insert(order)
}



func GetOrders() ([]Order, error) {
	session := utils.GetDBSession()

	collection := session.DB("ecommerce").C("orders")

	aggregateQuery := []bson.M{
		{
			"$lookup": bson.M{
				"from":         "products",
				"localField":   "products",
				"foreignField": "_id",
				"as":           "productData",
			},
		},
	}

	var orders []Order
	err := collection.Pipe(aggregateQuery).All(&orders)
	if err != nil {
		log.Println("Error executing query:", err)
		return nil, err
	}

	defer session.Close()
	return orders, nil
}

func GetOrdersByClientID(clientId string) ([]Order, error) {
	session := utils.GetDBSession()
	defer session.Close()

	collection := session.DB("ecommerce").C("orders")

	aggregateQuery := []bson.M{
		{
			"$match": bson.M{"user_id": bson.ObjectIdHex(clientId)},
		},
		{
			"$lookup": bson.M{
				"from":         "products",
				"localField":   "products",
				"foreignField": "_id",
				"as":           "productData",
			},
		},
	}

	var orders []Order
	err := collection.Pipe(aggregateQuery).All(&orders)
	if err != nil {
		log.Println("Error executing query:", err)
		return nil, err
	}

	return orders, nil
}