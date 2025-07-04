package main

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func getTodos(c *fiber.Ctx) error {
	var todos []Todo

	cursor, err := 	collection.Find(context.Background(), bson.M{})

	if(err != nil){
		return err
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()){
		var todo Todo

		if err := cursor.Decode(&todo); err != nil {
			return err
		}

		todos = append(todos, todo)
	}

	return c.JSON(todos)
}

func createTodo(c *fiber.Ctx) error {
	todo := new(Todo)

	if err:= c.BodyParser(todo); err != nil {
		return err
	}

	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{"error" : "Body is required"})
	}

	insertResult, err := collection.InsertOne(context.Background(), todo)

	if err != nil {

	}

	todo.Id = insertResult.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(todo)

}

func updateTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectId, err := primitive.ObjectIDFromHex(id)


	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid todo Id"})
	}

	filter := bson.M{"_id" : objectId}
	update := bson.M{"$set": bson.M{"completed": true}}


	_, err = collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update todo"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Todo updated successfully"})
}

func deleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid todo Id"})
	}

	_, err = collection.DeleteOne(context.Background(), bson.M{"_id": objectId})

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete todo"})
	}	

	return c.Status(200).JSON(fiber.Map{"message": "Todo deleted successfully"})
}