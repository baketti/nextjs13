import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { PostAdminSessionsApi } from "./interfaces";

export default async function handler(
  req: PostAdminSessionsApi.Request,
  res: NextApiResponse<PostAdminSessionsApi.EndpointResponse>,
  originalReq: NextApiRequest,
) {
  try {
    const { validationResult, queryStringParameters, payload } = req;

    /*
    questo pezzo di codice controlla se l'utente è loggato come admin, e quindi se
    è autorizzato o meno a fare questa richiesta.
    Ma, questo api serve per creare una nuova sessione admin, quindi non ha senso
    effettuare questo controllo perche in questo momento non vogliamo che il nostro admin
    sia già loggato, quindi non ci aspettiamo di ricevere un cookie.

    if(!originalReq.session.admin){
      return ResponseHandler.json<ErrorResponse>(
        res,
        {},
        StatusCodes.Unauthorized,
      );
    }
    */
    //validazione dei campi
    if (!validationResult.isValid) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        { message: validationResult.message! },
        StatusCodes.BadRequest,
      );
    }
    //se la validazione è andata a buon fine(e se arriviamo a questo punto del codice lo è)
    //allora creiamo la sessione admin

    const { email, password } = payload;
    //CHECK ADMIN CREDENTIALS (EMAIL E PASSWORD) ON DATABASE
    //se l'utente esiste allora creiamo la sessione admin
    originalReq.session.admin = {
      /*corrisponde all'oggetto ADMINSESSION  che viene creato solo con il campo isLoggedIn!
       * la prossima volta che questo admin farà la richiesta al server, noi sapremo che
       * è stato autenticato ma non sapremo chi è!!!
       * Per questo motivo andiamo ad aggiungere all'oggetto adminsession
       * un _id !!! */
      isLoggedIn: true,
      _id: "admin-id", //stringa che rappresenta un ObjectId
    };
    await originalReq.session.save();
    /*qui andiamo a dire alla response di next che nel momento in cui andiamo a rispondere
    al client, automaticamente lui metterà nel file di header  il set cookie con un oggetto
    che sarà la versione crittografata e serializzata dell'oggetto session, ovvero
    la sessione che abbiamo appena creato
     */
    return ResponseHandler.json<PostAdminSessionsApi.SuccessResponse>(res, {});
  } catch (e) {
    console.error(e);
    return ResponseHandler.json<ErrorResponse>(
      res,
      { message: "Internal error" },
      StatusCodes.InternalServerError,
    );
  }
}
