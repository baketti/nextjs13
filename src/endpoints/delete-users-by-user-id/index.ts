import { NextApiRequest, NextApiResponse } from "next";
import { ResponseHandler } from "@/lib/response-handler";
import validations from "./validations";
import handler from "./handler";
import { withIronSessionApiRoute } from "iron-session/next";
import { adminSessionOptions } from "@/lib/session";
/*
 * API creata con la cookie auth
 * diversa dall'api semplice
 * withIronSessionApiRoute=> wrapper creato ad hoc per funzionare su next all'interno della libreria iron-session
 *  che prende come parametri:
 *  => handler: funzione che gestisce la richiesta e la risposta che gli vengono passate
 *  => adminSessionOptions, oggetto grazie al quale specifichiamo che questa chiamata prevede l'utilizzo di uno
 * specifico cookie, quello definito al suo interno
 *
 * */
export default async function (req: NextApiRequest, res: NextApiResponse) {
  return withIronSessionApiRoute(
    (req: NextApiRequest, res: NextApiResponse) => {
      return ResponseHandler.handleRequest(req, res, validations, handler);
    },
    adminSessionOptions, //type: IronSessionOptions
  )(req, res);
}
