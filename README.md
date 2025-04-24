# product-crud-lambda

A proof of concept showing AWS Lambda HTTP functionalities, using NodeJS 22.x.

## Routes

Routes are specified in the respective route module.

When creating a new route module, you must include the route in the list of all routes in `src/routes/index.ts`.

## Steps

1. Create a new DynamoDB table called `product-table`. The partition key name is `id`. If you want a different name, edit `src/db.ts`.
2. Create a new AWS Lambda in the AWS Console. Give it access to DynamoDB when creating: create a new role and search for DynamoDB.
3. Run `npm install` to install dependencies.
4. Run `make build` to build the `function.zip` file. This is a ZIP file containing `node_modules` and our application code.
5. Upload the `function.zip` file to the AWS Lambda.
6. Create a new API Gateway.
7. Create the CRUD routes in the API Gateway.
8. Attach the AWS lambda to the CRUD Routes that were created.
9. Use the API Gateway `Invoke URL` to test the products. Check the `Testing Commands` section!

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

## Testing Commands

- `make build`
- `curl -X GET https://r5h2s64j2l.execute-api.eu-west-2.amazonaws.com/products`
- `curl -X POST https://r5h2s64j2l.execute-api.eu-west-2.amazonaws.com/products --json '{"name":"Product","description":"Cool product!","stock":100}'`
- `curl -X PUT https://r5h2s64j2l.execute-api.eu-west-2.amazonaws.com/products/6b455b2d-26d8-41e5-8d24-8fa5f9d1fca1 --json '{"name":"New Product Name","description":"New product description!","stock":1000}'`
- `curl -X DELETE https://r5h2s64j2l.execute-api.eu-west-2.amazonaws.com/products/6b455b2d-26d8-41e5-8d24-8fa5f9d1fca1`
