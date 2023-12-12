import { DeleteProductsByProductIdApi } from "@/endpoints/delete-products-by-product-id/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { cleanDb } from "@/lib/test-utils";
import { closeDbConnection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Product } from "@/models/server/Product";

const deleteProductsByProductIdPath = "delete-products-by-product-id";

beforeAll(async () => {
  await cleanDb();
});

describe("deleteProductsByProductId API", () => {
  test("It should fail for product not existing", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<DeleteProductsByProductIdApi.SuccessResponse>(
        deleteProductsByProductIdPath,
        {
          queryString: {
            productId: new ObjectId().toHexString(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.NotFound);
  });
  test("It should delete the product succesfully", async () => {
    /*
     * all'interno dei test possiamo utilizzare le nostre api per comunicare con il db ecc.
     * E' bene evitare l'incrocio dei test, quindi ad esempio se dobbiamo testare la delete di
     * un prodotto è meglio crearlo a mano interagendo con il nostro db di test e non ottenere
     * il prodotto di esempio da eliminare dal test dell api di creazione di un prodotto(post)
     * questo perchè vogliamo effettuare i nostri test in modo specifico di ogni endpoint
     * e per evitare di incappare in errori che non sono dovuti al test dell endpoint corrente*/
    const product = await Product.create(
      "product-name",
      "product-description",
      100,
    );
    const { statusCode, payload } =
      await TestHandler.invokeLambda<DeleteProductsByProductIdApi.SuccessResponse>(
        deleteProductsByProductIdPath,
        {
          queryString: {
            productId: product._id.toHexString(),
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
    /*
     * la chiamata api è andata a buon fine, ma dobbiamo assicurarci che il prodotto sia stato
     * effettivamente eliminato, perche ad esempio questo test verrebbe passato anche con l'azione di
     * delete bloccata("commentata"),l'id è esistente e valido nel nostro db e la chiamata è OK;
     * IN SEGUITO NOTA UN PASSAGGIO FONDAMENTALE DI ACCERTAMENTO DELL'ELIMINAZIONE DEL PRODOTTO DAL DB
     * => PRENDIAMO IL PRODOTTO TRAMITE L'ID DEL PRODOTTO ELIMINATO E CI ASPETTIAMO SIA NULL!
     *    SE E' STATO EFFETTIVAMENTE ELIMINATO IL TEST VERRA PASSATO;
     *    SE IL PRODOTTO NON E' NULL SIGNIFICA CHE NON E' STATO ELIMINATO E IL TEST FALLIRA'*/
    const product2 = await Product.getById(product._id);
    expect(product2).toBeNull();
  });
});

afterAll(async () => {
  await closeDbConnection();
});
