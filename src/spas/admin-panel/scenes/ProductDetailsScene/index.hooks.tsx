import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/admin-panel/redux-store";
export const useProductDetailsScene = () => {
  //importo dispatch
  const dispatch = useDispatch();
  const { productId } = useParams(); //ci consente di recuperare i parametri dinamici (:params) passati nell'url
  const product = useSelector(selectors.getCurrentProduct);
  const isLoadingProduct = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.getProductsByProductId.api),
  );
  useEffect(() => {
    dispatch(actions.getProductsByProductId.request({ productId }));
  }, [dispatch, productId]);
  return { product, isLoadingProduct };
};
