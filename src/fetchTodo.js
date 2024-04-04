const AWS = require("aws-sdk");

const fetchTodo = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const fetchItem = event.pathParameters?.id;

    let todo;

    try {
        const result = await dynamodb.get({
            TableName: "TodoTable",
            Key: {
              id: fetchItem
            }
        }).promise();

        todo = result.Item
    } catch (error) {
        console.log(error)
    };

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
  };
};

module.exports = {
  handler: fetchTodo
}