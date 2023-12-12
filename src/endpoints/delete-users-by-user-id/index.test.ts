import { DeleteUsersByUserIdApi } from "@/endpoints/delete-users-by-user-id/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";
import { cleanDb } from "@/lib/test-utils";
import { closeDbConnection } from "@/lib/mongodb";
import { User } from "@/models/server/User";
import { CookieTestHandler } from "@/lib/test-utils/session";
import { adminSessionOptions } from "@/lib/session";
//FILE DI TEMPLATE CREATO DA GeNYG IN AUTOMATICO

const deleteUsersByUserIdPath = "delete-users-by-user-id";
//JEST ESPORTA ALCUNE FUNZIONALITA DI TEST A LIVELLO GLOBALE, FUNZIONI NATIVE DI JEST
// COME AD ESEMPIO beforeAll, afterAll, describe, test
//VIENE ESEGUITA PRIMA DEI TEST
beforeAll(async () => {
  await cleanDb(); //connessione al db=>avviene con la prima chiamata api
});

describe("deleteUsersByUserId API", () => {
  test("It should fail because user calling the API it is not an admin!", async () => {
    const { statusCode, payload } =
      await TestHandler.invokeLambda<DeleteUsersByUserIdApi.SuccessResponse>(
        deleteUsersByUserIdPath,
        {
          queryString: {
            userId: "user-id",
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.Unauthorized);
    expect(payload.message).toEqual("Unauthorized");
  });
  test("It should delete the user succesfully!", async () => {
    const cookieSession = await CookieTestHandler.createSessionCookie(
      {
        admin: {
          _id: "admin-id",
          isLoggedIn: true,
        },
      },
      adminSessionOptions,
    );
    console.log("cookieSession", cookieSession);
    const user = await User.create();
    const { statusCode, payload } =
      await TestHandler.invokeLambda<DeleteUsersByUserIdApi.SuccessResponse>(
        deleteUsersByUserIdPath,
        {
          queryString: {
            userId: user._id.toHexString(),
          },
          headers: {
            //cookie: cookieSession.cookie,
            ...cookieSession,
          },
        },
      );
    expect(statusCode).toBe(StatusCodes.OK);
    const deletedUser = await User.getById(user._id);
    expect(deletedUser).toBeNull();
  });
});
//VIENE ESEGUITA DOPO I TEST
afterAll(async () => {
  await closeDbConnection(); //per chiudere la connessione al mongo
});
