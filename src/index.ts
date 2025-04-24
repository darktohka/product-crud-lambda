import {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
} from "aws-lambda";
import { routes } from "./routes";
import { res } from "./utils";

export const handle_event = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
  // Attempt to route the request based on the route key
  const routeKey = event.requestContext.routeKey;
  const route = routes[routeKey];

  if (!route) {
    return res(404, { message: `Route not found: ${routeKey}` });
  }

  return route(event);
};

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
  try {
    return handle_event(event);
  } catch (error) {
    // Log the error for debugging
    return res(500, { message: `Internal server error: ${error}` });
  }
};
