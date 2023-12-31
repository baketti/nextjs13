import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { DeleteProductsByProductIdApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<DeleteProductsByProductIdApi.QueryStringParameters> => ({
    productId: yupObjectId().required(), //validatore customizzato da GeNYG per validare l'ObjectId
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
