# product-crud-lambda

A proof of concept showing AWS Lambda HTTP functionalities, using NodeJS 22.x.

## Routes

Routes are specified in the respective route module.

When creating a new route module, you must include the route in the list of all routes in `src/routes/index.ts`.

## Steps

1. Create a new AWS Lambda in the AWS Console. Give it access to DynamoDB when creating: create a new role and search for DynamoDB.
2. Run `make build` to build the `function.zip` file. This is a ZIP file containing `node_modules` and our application code.
3. Upload the `function.zip` file to the AWS Lambda.
4. Create a new API Gateway.
5. Create the CRUD routes in the API Gateway.
6. Attach the AWS lambda to the CRUD Routes that were created.

## Troubleshooting

In case of any issues, use the CloudWatch portal to check the lambda logs. You will find the lambda logs in **Log Groups**.

## DynamoDB CRUD Routes

- **`GET /products`**: Retrieves all products from the DynamoDB table.
- **`GET /products/{id}`**: Retrieves a single product by its ID.
- **`POST /products`**: Creates a new product in the DynamoDB table.
- **`PUT /products/{id}`**: Updates an existing product by its ID.
- **`DELETE /products/{id}`**: Deletes a product by its ID from the DynamoDB table.

## Project Structure

Routes:

- **`src/routes/dynamo.ts`**: Contains DynamoDB-specific routes.
- **`src/routes/index.ts`**: Contains all routes.
- **`src/index.ts`**: Contains routing logic, the entrypoint of the AWS Lambda.

General:

- **`src/db.ts`**: Contains DynamoDB setup.
- **`src/types.ts`**: Contains types for products.
- **`src/utils.ts`**: Contains utilities to help build HTTP responses.
