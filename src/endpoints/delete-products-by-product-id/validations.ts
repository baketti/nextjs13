import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { DeleteProductsByProductIdApi } from "./interfaces";

const queryStringParametersValidations =
  (): YupShapeByInterface<DeleteProductsByProductIdApi.QueryStringParameters> => ({
    productId: yup.string().required(),
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
