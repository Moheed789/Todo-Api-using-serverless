const AWS = require("aws-sdk");
const {v4: uuidv4} = require("uuid");

const addTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const {todo} = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = uuidv4();

  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false
  };
  
  await dynamodb.put({
    TableName: "TodoTable",
    Item: newTodo
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: addTodo
}