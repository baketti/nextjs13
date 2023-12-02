import React, { memo } from "react";
import { AppHead } from "@/components/AppHead";
import { GetServerSidePropsResult, GetServerSidePropsContext } from "next";

type HelpProps = {};

const Help = memo(({}: HelpProps) => {
  return (
    <>
      <AppHead title="Help" description="" />
    </>
  );
});
Help.displayName = "Help";

export default Help;

export async function getServerSideProps({}: //viene richiamato ad ogni richiesta(ad ogni rendering)
//esempio: per renderizzare pagine con dati che devono essere aggiornati ogni volta
GetServerSidePropsContext<{}>): Promise<GetServerSidePropsResult<HelpProps>> {
  return {
    props: {},
  };
}
