import React, { memo } from "react";
import { AppHead } from "@/components/AppHead";
import { GetStaticPropsResult, GetStaticPropsContext } from "next";
import { GetStaticPathsResult } from "next";

type ExampleMultipleParamsProps = {};

const ExampleMultipleParams = memo(({}: ExampleMultipleParamsProps) => {
  return (
    <>
      <AppHead title="ExampleMultipleParams" description="" />
    </>
  );
});
ExampleMultipleParams.displayName = "ExampleMultipleParams";

export default ExampleMultipleParams;

export async function getStaticPaths(): Promise<GetStaticPathsResult<{}>> {
  return {
    paths: [
      {
        params: {
          params: ["3", "latest"],
        },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps({
  params: { params },
}: GetStaticPropsContext<{ params: string[] }>): Promise<
  GetStaticPropsResult<ExampleMultipleParamsProps>
> {
  return {
    props: {},
  };
}
