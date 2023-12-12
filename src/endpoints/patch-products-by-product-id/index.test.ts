import { PatchProductsByProductIdApi } from "@/endpoints/patch-products-by-product-id/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { cleanDb } from "@/lib/test-utils";
import { closeDbConnection } from "@/lib/mongodb";
import { Product } from "@/models/server/Product";

const patchProductsByProductIdPath = "patch-products-by-product-id";

beforeAll(async () => {
  await cleanDb();
});

describe("patchProductsByProductId API", () => {
  test("It should ...", async () => {
    const product = await Product.create(
      "product-name",
      "product-description",
      100,
    );
    const { statusCode, payload } =
      await TestHandler.invokeLambda<PatchProductsByProductIdApi.SuccessResponse>(
        patchProductsByProductIdPath,
        {
          queryString: {
            productId: product._id.toHexString(),
          },
          payload: {
            description: "product-description-2",
            price: product.price,
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
    await product.refresh();
    expect(product.description).toEqual("product-description-2");
    expect(product.price).toEqual(100);
    expect(product.name).toEqual("product-name");
  });
});

afterAll(async () => {
  await closeDbConnection();
});
