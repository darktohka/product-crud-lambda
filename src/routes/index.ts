import {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
} from "aws-lambda";
import { routes as dynamoRoutes } from "./dynamo";

// A method to handle the request and return a response
export type Route = (
  _event: APIGatewayProxyEventV2
) => Promise<APIGatewayProxyStructuredResultV2>;

// All routes
export const routes = { ...dynamoRoutes };
