package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	Id primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Completed bool `json:"completed"`
	Body string `json:"body"`
}

var collection *mongo.Collection

func main() {

	fmt.Println("Hello, World!")

	// Initialize MongoDB connection and collection here
	// err := godotenv.Load()

	// if err != nil {
	// 	log.Fatal("Error loading .env file", err)
	// }

	MONGO_URI := os.Getenv("MONGO_URI")

	clientOptions := options.Client().ApplyURI(MONGO_URI)

	client, err := mongo.Connect(context.Background(), clientOptions)

	if(err != nil) {
		log.Fatal("Error connecting to MongoDB", err)
	}

	err = client.Ping(context.Background(), nil)

	if(err != nil) {
		log.Fatal("Error pinging MongoDB", err)
	}

	fmt.Println("Connected to MongoDB!")

	collection = client.Database("golangTodo").Collection("todos")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins : os.Getenv("FRONTEND_URL"),
		AllowMethods : "GET, POST, PATCH, DELETE",
		AllowHeaders : "Origin, Content-Type, Accept",
	}))

	app.Get("/api/todos", getTodos)
	app.Post("/api/todos", createTodo)
	app.Patch("/api/todos/:id", updateTodo)
	app.Delete("/api/todos/:id", deleteTodo)

	port := os.Getenv("PORT")

	if(port == "") {
		port = ":8000"
	}

	log.Fatal(app.Listen(":" + port))
}

