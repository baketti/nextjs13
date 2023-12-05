import React, { memo } from "react";
import { FormProvider } from "react-hook-form";
import { useAddProductForm } from "./index.hooks";
import { Button, Stack } from "@mui/material";
import { FormTextField } from "@/components/_form/FormTextField";

type AddProductFormProps = {};

export const AddProductForm = memo(({}: AddProductFormProps) => {
  const { formData, triggerSubmit, submitDisabled } = useAddProductForm();

  return (
    <FormProvider {...formData}>
      <form onSubmit={triggerSubmit}>
        <Stack spacing={3}>
          <FormTextField name="id" label="id" />
          <FormTextField name="name" label="nome" />
          <FormTextField name="description" label="descrizione" />
          <FormTextField
            name="price"
            label="prezzo"
            type="number"
            inputProps={{ step: 0.01 }}
          />
          <Button variant="contained" type="submit" disabled={submitDisabled}>
            Salva
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
});
AddProductForm.displayName = "AddProductForm";
