import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function SubmitButton({ title, backgroundcolor }) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton title={title} color={backgroundcolor} onPress={handleSubmit} />
  );
}

export default SubmitButton;
