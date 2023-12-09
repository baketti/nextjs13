import { useParams } from "react-router";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectors } from "@/spas/admin-panel/redux-store";

export const useProductDetailsScene = () => {
  const { productId } = useParams(); //ci consente di recuperare i parametri dinamini (:params) passati nell'url
  const productsList = useSelector(selectors.getProductsList);
  const product = useMemo(
    () => productsList.find((p) => p._id === productId),
    [productsList, productId],
  );
  return { product };
};
