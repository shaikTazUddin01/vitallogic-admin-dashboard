
import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  required?: boolean;
  name: string;
    label?: string;
  type?: string;
  defaultvalue?: string;
  placeholdertext?: string;
  variant?: "bordered" | "flat" | "faded" | "underlined";
}

const TDTextArea = ({
  name,
    label,
  variant = "flat",
  required = false,
  defaultvalue,
  placeholdertext,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // console.log(errors);

  return (
    <textarea
        // label={label}
      // variant={variant}
      {...register(name)}
      defaultValue={defaultvalue}
      // labelPlacement="inside"
    //   errorMessage={errors[name]?.message as string | undefined}
    //   isInvalid={!!errors[name]}
      // isRequired={required}
      placeholder={placeholdertext}
    />
  );
};

export default TDTextArea;