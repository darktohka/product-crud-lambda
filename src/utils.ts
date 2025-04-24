import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";

export const res = (
  statusCode: number,
  body: any
): APIGatewayProxyStructuredResultV2 => ({
  statusCode,
  body: JSON.stringify(body),
  headers: { "Content-Type": "application/json" },
});
