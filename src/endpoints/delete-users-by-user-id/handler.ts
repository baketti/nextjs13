import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { DeleteUsersByUserIdApi } from "./interfaces";
import { User } from "@/models/server/User";

export default async function handler(
  req: DeleteUsersByUserIdApi.Request,
  res: NextApiResponse<DeleteUsersByUserIdApi.EndpointResponse>,
  originalReq: NextApiRequest,
) {
  try {
    const { validationResult, queryStringParameters } = req;

    //qui verifico se questa session admin esiste
    if (!originalReq.session.admin) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        {
          message: "Unauthorized",
        },
        StatusCodes.Unauthorized,
      );
    }
    //anche se l'admin esiste, qui controllo se è verificato
    //NB: L'_ID E' UNA STRING FISSA CHE STIAMO USANDO SOLO PER CAPIRE COME FUNZIONA IL SISTEMA
    const adminSession = originalReq.session.admin;
    if (!adminSession.isLoggedIn || adminSession._id !== "admin-id") {
      return ResponseHandler.json<ErrorResponse>(
        res,
        {
          message: "Unauthorized",
        },
        StatusCodes.Unauthorized,
      );
    }
    /*
    solitamente si fa così, ma attualmente non abbiamo ancora un modello Admin creato nel db

    const admin = Admin.getById(adminSession._id);
    if (!admin) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        {},
        StatusCodes.Unauthorized,
      );
    }
    */
    //validazione dei campi della richiesta API
    if (!validationResult.isValid) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        { message: validationResult.message! },
        StatusCodes.BadRequest,
      );
    }

    /*se la validazione è andata a buon fine(e se arriviamo a questo punto del codice lo è);
     * 1) recupero l'id dell'utente da eliminare dai parametri della richiesta;
     * 2) trovo l'utente nel db;
     * 3) se l'utente non esiste, allora restituisco 404;
     * 4) se l'utente esiste, allora lo elimino dal db;
     * */

    const { userId } = queryStringParameters;
    const user = await User.getById(userId);
    if (!user) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        { message: "User not found" },
        StatusCodes.NotFound,
      );
    }
    await User.delete(user._id);

    return ResponseHandler.json<DeleteUsersByUserIdApi.SuccessResponse>(
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
