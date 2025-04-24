import {
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { docClient, TABLE_NAME } from "../db";
import {
  CreateProductDTO,
  CreateProductSchema,
  UpdateProductDTO,
} from "../types";
import * as v from "valibot";
import { res } from "../utils";
import { Route } from ".";

// Old: APIGatewayProxyEvent, APIGatewayProxyResult
export const get_all: Route = async (_event: APIGatewayProxyEventV2) => {
  const result = await docClient.send(
    new ScanCommand({ TableName: TABLE_NAME })
  );
  return res(200, result.Items || []);
};

export const get_one: Route = async (event: APIGatewayProxyEventV2) => {
  const id = event.pathParameters?.id;
  const result = await docClient.send(
    new GetCommand({ TableName: TABLE_NAME, Key: { id } })
  );

  if (!result.Item) {
    return res(404, { message: "Product not found." });
  }

  return res(200, result.Item);
};

export const create_one: Route = async (event: APIGatewayProxyEventV2) => {
  let body: CreateProductDTO;

  try {
    body = v.parse(CreateProductSchema, JSON.parse(event.body || "{}"));
  } catch (error) {
    return res(400, { message: "Invalid request body." });
  }

  const item = { id: crypto.randomUUID(), ...body };
  await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));
  return res(201, item);
};

export const update_one: Route = async (event: APIGatewayProxyEventV2) => {
  const id = event.pathParameters?.id;
  let body: UpdateProductDTO;

  try {
    body = v.parse(CreateProductSchema, JSON.parse(event.body || "{}"));
  } catch (error) {
    return res(400, { message: "Invalid request body." });
  }

  const result = await docClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: "SET #n = :n, description = :d, stock = :s",
      ExpressionAttributeNames: { "#n": "name" },
      ExpressionAttributeValues: {
        ":n": body.name,
        ":d": body.description,
        ":s": body.stock,
      },
      ReturnValues: "ALL_NEW",
    })
  );

  return res(200, result.Attributes);
};

export const delete_one: Route = async (event: APIGatewayProxyEventV2) => {
  const id = event.pathParameters?.id;

  const result = await docClient.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id },
      ReturnValues: "ALL_OLD",
    })
  );

  if (!result.Attributes) {
    return res(404, { message: "Product not found." });
  }

  return res(200, result.Attributes);
};

export const routes: Record<string, Route> = {
  "GET /products": get_all,
  "GET /products/{id}": get_one,
  "POST /products": create_one,
  "PUT /products/{id}": update_one,
  "DELETE /products/{id}": delete_one,
};
