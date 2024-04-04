const AWS = require("aws-sdk");
const {v4: uuidv4} = require("uuid");

const updateTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const {completed} = JSON.parse(event.body);
  const updateItem = event.pathParameters?.id;

  await dynamodb.update({
    TableName: "TodoTable",
    Key: {
        id: updateItem
    },
    UpdateExpression: 'set completed = :completed',
    ExpressionAttributeValues: {
        ':completed': completed
    },
    ReturnValues: "ALL_NEW"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
        message: "Todo Updated"
    }),
  };
};

module.exports = {
  handler: updateTodo
}