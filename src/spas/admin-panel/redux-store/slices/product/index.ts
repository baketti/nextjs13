import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as selectors from "./product.selectors";
import { ProductState } from "./product.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./product.sagas";
import { IProductFe } from "@/models/client/ProductFe";

const initialState: ProductState = {
  list: [],
};

export const productStore = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProductFe>) => {
      state.list.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        (product) => product.id !== action.payload,
      );
    },
  },
});

export { selectors, sagas };
