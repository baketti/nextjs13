import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse } from "next";
import { GetProductByProductIdApi } from "./interfaces";
import { Product } from "@/models/server/Product";

export default async function handler(
  req: GetProductByProductIdApi.Request,
  res: NextApiResponse<GetProductByProductIdApi.EndpointResponse>,
) {
  try {
    const { validationResult, queryStringParameters } = req;
    if (!validationResult.isValid) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        { message: validationResult.message! },
        StatusCodes.BadRequest,
      );
    }

    const { productId } = queryStringParameters;
    const product = await Product.getById(productId);
    if (!product) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        { message: "Product not found" },
        StatusCodes.NotFound,
      );
    }
    return ResponseHandler.json<GetProductByProductIdApi.SuccessResponse>(res, {
      product: product?.toClientVersion(),
    });
  } catch (e) {
    console.error(e);
    return ResponseHandler.json<ErrorResponse>(
      res,
      { message: "Internal error" },
      StatusCodes.InternalServerError,
    );
  }
}
