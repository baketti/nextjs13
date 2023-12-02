import React, { memo } from "react";
import { AppHead } from "@/components/AppHead";
import { GetStaticPropsResult, GetStaticPropsContext } from "next";

type ContactsProps = {
  contacts: {
    email: string;
    tel: string;
  };
};

const Contacts = memo(({ contacts }: ContactsProps) => {
  return (
    <>
      <AppHead title="Contacts" description="" />
      <div>Contacts</div>
      <div>{contacts.email}</div>
      <div>{contacts.tel}</div>
    </>
  );
});
Contacts.displayName = "Contacts";

export default Contacts;

export async function getStaticProps({}: GetStaticPropsContext<{}>): Promise<
  GetStaticPropsResult<ContactsProps>
> {
  //accesso al db fake
  //getStaticProps => genera le props e le ritorna all'interno dell'oggetto props
  //viene richiamato SOLO al primo rendering
  const contacts = {
    email: "test@test.com",
    tel: "1234556677" + Math.random(),
  };
  return {
    props: {
      contacts,
    },
  };
}
