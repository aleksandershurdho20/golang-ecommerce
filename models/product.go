package models

import (
	"time"
	"ecommerce/app/utils"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"log"
)

type Product struct {
	ID       bson.ObjectId `bson:"_id,omitempty" json:"_id"`
	Title string        `bson:"title" json:"title"`
	Price    int        `bson:"price" json:"price"`
	Quantity    int        `bson:"quantity" json:"quantity"`
	Description string        `bson:"description" json:"description"`
	Category string        `bson:"category" json:"category"`
	Image string        `bson:"image" json:"image"`
	CreatedAt time.Time     `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time     `bson:"updated_at" json:"updated_at"`
}

func (product *Product) Save() error {
	product.ID = bson.NewObjectId()
	product.CreatedAt = time.Now()
	product.UpdatedAt = time.Now()

	session := utils.GetDBSession()
	defer session.Close()

	return session.DB("ecommerce").C("products").Insert(product)
}



func GetAllProductsFromDB() ([]Product, error)  {


	session := utils.GetDBSession()
	defer session.Close()

	collection := session.DB("ecommerce").C("products")

	var products []Product
	err := collection.Find(bson.M{}).All(&products)
	if err != nil {
		log.Println("Error executing query:", err)
		return nil, err
	}

	return products, nil
}


func GetAProduct(id string) (*Product, error) {
	session := utils.GetDBSession()
	defer session.Close()

	collection := session.DB("ecommerce").C("products")

	var product Product
	err := collection.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&product)
	if err != nil {
		if err == mgo.ErrNotFound {
			return nil, nil // Product not found
		}
		log.Println("Error executing query:", err)
		return nil, err
	}

	return &product, nil
}

func DeleteProduct(id string) error {
	session := utils.GetDBSession()
	defer session.Close()

	collection := session.DB("ecommerce").C("products")

	err := collection.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		log.Println("Error executing query:", err)
		return err
	}

	return nil
}

func UpdateProduct(id string, updatedProduct *Product) error {
	session := utils.GetDBSession()
	defer session.Close()

	collection := session.DB("ecommerce").C("products")

	// Create an update query
	updateQuery := bson.M{
		"$set": bson.M{
			"title":       updatedProduct.Title,
			"price":       updatedProduct.Price,
			"quantity":    updatedProduct.Quantity,
			"description": updatedProduct.Description,
			"category":    updatedProduct.Category,
			"updated_at":  time.Now(),
		},
	}

	err := collection.UpdateId(bson.ObjectIdHex(id), updateQuery)
	if err != nil {
		log.Println("Error executing update query:", err)
		return err
	}

	return nil
}

