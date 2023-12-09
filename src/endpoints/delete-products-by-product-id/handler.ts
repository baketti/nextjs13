import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse } from "next";
import { DeleteProductsByProductIdApi } from "./interfaces";

export default async function handler(
  req: DeleteProductsByProductIdApi.Request,
  res: NextApiResponse<DeleteProductsByProductIdApi.EndpointResponse>,
) {
  try {
    const { validationResult } = req;

    if (!validationResult.isValid) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        { message: validationResult.message! },
        StatusCodes.BadRequest,
      );
    }

    return ResponseHandler.json<DeleteProductsByProductIdApi.SuccessResponse>(
      res,
      {},
    );
  } catch (e) {
    console.error(e);
    return ResponseHandler.json<ErrorResponse>(
      res,
      { message: "Internal error" },
      StatusCodes.InternalServerError,
    );
  }
}
