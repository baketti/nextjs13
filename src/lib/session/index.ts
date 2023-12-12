// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";

import { AdminSession } from "@/models/server/AdminSession";
import { UserSession } from "@/models/server/UserSession";

/*
 * IronSessionOptions
 * => PASSWORD: serve al server per crittografare e decrittografare il cookie
 * => NOME DEL COOKIE: serve al browser per identificare il cookie ed è composto da GeNYG
 * con projectName+nome ruolo+ cookie-auth
 * cookieOptions=> secure: variabile per la sicurezza che viene impostata a true se siamo in produzione
 * */
export const adminSessionOptions: IronSessionOptions = {
  password: process.env.ADMIN_SECRET_COOKIE_PASSWORD as string,
  cookieName: "nextjs13-admin-cookie-auth",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const userSessionOptions: IronSessionOptions = {
  password: process.env.USER_SECRET_COOKIE_PASSWORD as string,
  cookieName: "nextjs13-user-cookie-auth",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    admin?: AdminSession;
    user?: UserSession;
  }
}
