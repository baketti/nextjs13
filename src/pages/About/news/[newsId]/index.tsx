import React, { memo } from "react";
import { AppHead } from "@/components/AppHead";
import { GetStaticPropsResult, GetStaticPropsContext } from "next";
import { GetStaticPathsResult } from "next";

type NewsDetailsProps = {
  news: {
    id: string;
    title: string;
  };
};
const NewsDetails = memo(({ news }: NewsDetailsProps) => {
  return (
    <>
      <AppHead title="NewsDetails" description="" />
      <div>News</div>
      <div>{news.id}</div>
      <div>{news.title}</div>
    </>
  );
});
NewsDetails.displayName = "NewsDetails";

export default NewsDetails;

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<{
    newsId: string;
  }>
> {
  //leggo dal db fake gli id delle news
  let newsList = [
    {
      id: "1",
    },
    {
      id: "2",
    },
  ];
  return {
    paths: newsList.map((news) => ({
      params: {
        newsId: news.id,
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params: { newsId },
}: GetStaticPropsContext<{ newsId: string }>): Promise<
  GetStaticPropsResult<NewsDetailsProps>
> {
  let newsList = [
    {
      id: "1",
    },
    {
      id: "2",
    },
  ];
  console.log("news id: ", newsList[0]);
  //Controllo se newsId è valido o esiste, se non esiste ritorno 404
  //if(newsList.includes({id:newsId})){ NON FUNZIONA PERCHE' L'OGGETTO PASSATO NON FA RIFERIMENTO ALLO STESSO OGGETTO DELL'ARRAY
  const foundNews = newsList.find((news) => news.id === newsId);
  //if (!newsList.some((news) => news.id === newsId)) {
  if (foundNews === undefined) {
    console.log("newsid: ", newsId);
    return {
      notFound: true,
    };
  }
  //Altrimenti, leggo dal DB fake la news con id = newsId
  const news = {
    id: foundNews.id,
    title: "titolo della news" + newsId,
  };
  return {
    props: {
      news,
    },
  };
}
