import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup"; //libreria js di validazione di array oggetti (lo utilizzo per validare i campi dei form)
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  //schema oggetto form
  name: yup
    .string()
    .min(3, "Il nome deve avere almeno 3 caratteri")
    .max(50, "Massimo 50 caratteri")
    .required("Richiesto"),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  privacyAccepted: yup
    .bool()
    .oneOf([true], "Please accept privacy conditions")
    .required(),
  birthDate: yup.date().required(),
});

type SignupFormData = {
  //tipo del nostro form
  name: string;
  email: string;
  password: string;
  privacyAccepted: boolean;
  birthDate: Date;
};

export const useSignupForm = () => {
  const formData = useForm<SignupFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      privacyAccepted: false,
      birthDate: new Date(),
    },
  });
  const {
    handleSubmit,
    formState: { isValid, isSubmitted, errors },
  } = formData;
  const submitDisabled = isSubmitted && !isValid;

  const triggerSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        console.log("Success!!!", data);
        // data.name;
      }),
    [handleSubmit],
  );
  console.log({ errors });

  return {
    formData,
    triggerSubmit,
    submitDisabled,
  };
};
