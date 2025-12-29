

import { useFormContext } from "react-hook-form";

interface IProps {
  required?: boolean;
  name: string;
  label: string;
  options: { key: string; label: string }[];
  size?:"sm"|"md"|"lg";
  defaultValue?: string | undefined
  
}

const TDSelect = ({
  name,
  label,
  options,
  size="md",
  defaultValue,
  required = false,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  // console.log(errors);
  return (
   <select {...register(name)} defaultValue={defaultValue}>
  {options.map(o => (
    <option key={o.key} value={o.key}>
      {o.label}
    </option>
  ))}
</select>

  );
};

export default TDSelect;