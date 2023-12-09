import { GetProductByProductIdApi } from "@/endpoints/get-products-by-product-id/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";

const getProductByProductIdPath = "get-products-by-product-id";

beforeAll(async () => {
  // await cleanDb();
});

describe("getProductByProductId API", () => {
  test("It should ...", async () => {
    // const { statusCode, payload } = await TestHandler.invokeLambda<GetProductByProductIdApi.SuccessResponse>(getProductByProductIdPath);
    // expect(statusCode).toBe(StatusCodes.OK);
  });
});

afterAll(async () => {
  // await closeDbConnection();
});
