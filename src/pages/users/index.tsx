import React, { memo } from "react";
import { AppHead } from "@/components/AppHead";
import { GetServerSidePropsResult, GetServerSidePropsContext } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { adminSessionOptions } from "@/lib/session";

type UsersListProps = {
  //admin: any;
};

const UsersList = memo(({}: UsersListProps) => {
  return (
    <>
      <AppHead title="UsersList" description="" />
    </>
  );
});
UsersList.displayName = "UsersList";

export default UsersList;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({
    req: { session, cookies, headers },
  }: GetServerSidePropsContext<{}>): Promise<
    GetServerSidePropsResult<UsersListProps>
  > {
    //controlliamo se in questa session non c'è un admin,
    //lo reindirizziamo alla pagina di login
    if (!session?.admin) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    /*se invece c'è un admin, gli diamo accesso alla pagina
    recuperando l'admin grazie all'id che abbiamo salvato nella session*/
    //const admin = await Admin.getById(new ObjectId(session.admin._id));
    /*controllo se l'admin esiste
    // se non esiste, lo reindirizziamo alla pagina di login*/
    /*if (!admin) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }*/
    //se invece esiste, lo inviamo alla pagina come prop
    return {
      props: {
        //admin,=> lo andremo a specificare nella userslistprops per poterlo poi utilizzare
      },
    };
  },
  adminSessionOptions,
);
