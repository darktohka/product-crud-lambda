# product-crud-lambda

A proof of concept showing AWS Lambda HTTP functionalities, using NodeJS 22.x.

## Routes

Routes are specified in the respective route module.

When creating a new route module, you must include the route in the list of all routes in `src/routes/index.ts`.

## Project Structure

Routes:

- **`src/routes/dynamo.ts`**: Contains DynamoDB-specific routes.
- **`src/routes/index.ts`**: Contains all routes.
- **`src/index.ts`**: Contains routing logic, the entrypoint of the AWS Lambda.

General:

- **`src/db.ts`**: Contains DynamoDB setup.
- **`src/types.ts`**: Contains types for products.
- **`src/utils.ts`**: Contains utilities to help build HTTP responses.
