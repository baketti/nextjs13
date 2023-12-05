import React, { memo } from "react";
import { useProductDetailsScene } from "./index.hooks";
import { Box, Stack, Typography } from "@mui/material";

type ProductDetailsSceneProps = {};

export const ProductDetailsScene = memo(({}: ProductDetailsSceneProps) => {
  const { product } = useProductDetailsScene();

  return (
    <Stack>
      {!product && <Typography>Prodotto non trovato</Typography>}
      <Typography>{product?.name}</Typography>
      <Typography>{product?.description}</Typography>
      <Typography>{product?.price}</Typography>
    </Stack>
  );
});

ProductDetailsScene.displayName = "ProductDetailsScene";
