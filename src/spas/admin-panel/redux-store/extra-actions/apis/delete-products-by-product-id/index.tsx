import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";

export interface DeleteProductsByProductIdParams {
  productId: string;
  /*
   per il momento lato client possiamo lasciare stringa
   ma è necessario ricordarsi che questo productId è si una stringa
   ma una stringa che rappresenta un ObjectId
   */
}
export interface DeleteProductsByProductIdResponseData {}
export default apiActionBuilder<
  DeleteProductsByProductIdParams,
  ApiSuccessAction<
    DeleteProductsByProductIdResponseData,
    DeleteProductsByProductIdParams
  >,
  ApiFailAction<DeleteProductsByProductIdParams>
>(
  "apis/products/{productId}/delete",
  (
    params: DeleteProductsByProductIdParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<DeleteProductsByProductIdParams>(
      {
        path: `/products/${params.productId}`,
        method: HttpMethod.DELETE,
      },
      options,
      params,
    ),
  }),
);
