import { ErrorResponse, RequestI } from "@/lib/response-handler";

export namespace DeleteProductsByProductIdApi {
  export type QueryStringParameters = {
    productId: string;
  };

  export type SuccessResponse = {
    message?: string;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, null> {}
}
