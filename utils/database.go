package utils

import (
	"gopkg.in/mgo.v2"
)

var Session *mgo.Session

func InitDatabase(connectionString string ) error {
	s,err:= mgo.Dial(connectionString)
	if err!=nil{
		return err
	}
	Session = s
	return nil 
}

func GetDBSession() *mgo.Session {
	return Session.Copy()
}