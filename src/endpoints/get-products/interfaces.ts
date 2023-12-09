import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { IProductFe } from "@/models/client/ProductFe";

export namespace GetProductsApi {
  //qui se volessi passare dei parametri nella query string per effettuare get specifiche ad esempio filtrate o ordinate ecc.
  export type QueryStringParameters = {};

  export type SuccessResponse = {
    message?: string;
    products: IProductFe[];
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, null> {}
}
