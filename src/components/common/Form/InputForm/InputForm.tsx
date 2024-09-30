import { MDBIcon, MDBInput } from "mdb-react-ui-kit";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  touchedFields: boolean | undefined;
  error: string | undefined;
  type: string;
  register: UseFormRegister<TFieldValue>;
  icon: string;
};
const InputForm = <TFieldValue extends FieldValues>({
  label,
  name,
  touchedFields,
  error,
  register,
  type,
  icon,
}: InputProps<TFieldValue>) => {
  return (
    <div className="d-flex flex-row align-items-start mb-4">
      <MDBIcon fas icon={`${icon} me-3`} size="lg" />
      <div>
        <MDBInput
          label={label}
          id={name}
          type={type}
          className={`w-100 ${touchedFields && !error ? "is-valid" : ""} ${
            error ? "is-invalid" : ""
          }`}
          {...register(name)}
        />
        <p className="text-danger text-center m-0 fa-xs pt-2">{error}</p>
      </div>
    </div>
  );
};

export default InputForm;
