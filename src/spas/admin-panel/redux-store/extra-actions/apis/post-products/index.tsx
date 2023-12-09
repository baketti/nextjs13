import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { IProductFe } from "@/models/client/ProductFe";

/*parametri che riceve la nostra chiamata ajax quando dispatchiamo l'azione di request
quando vogliamo fare una req al server, tutti i parametri passati alla nostra azione di request
devono essere elencati qui sotto in PostProductsParams, perchè tramite questi verrà costruita
la nostra chiamata api qui sotto in apiActionBuilder
nella gran parte dei casi i params da passare corrispondono al payload, ma non è sempre così*/
export interface PostProductsParams {
  name: string;
  description: string;
  price: number;
}

/*dati che vengono dispatchiati quando la nostra chiamata ajax ha successo
tutti i dati che riceviamo dal server e li andiamo a definire,
perchè sappiamo cosa ci arriva e di che tipo è
 */
export interface PostProductsResponseData {
  product: IProductFe;
}
export default apiActionBuilder<
  PostProductsParams,
  ApiSuccessAction<PostProductsResponseData, PostProductsParams>,
  ApiFailAction<PostProductsParams>
>(
  "apis/products/post",
  (params: PostProductsParams, options?: ApiRequestPayloadBuilderOptions) => ({
    payload: apiRequestPayloadBuilder<PostProductsParams>(
      {
        path: "/products",
        method: HttpMethod.POST,
        body: {
          name: params.name,
          description: params.description,
          price: params.price,
        },
      },
      options,
      params,
    ),
  }),
);
