import { MDBIcon, MDBInput } from "mdb-react-ui-kit";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import successAlert from "@assets/successAlert.json";
import wrongAlert from "@assets/wrongAlert.json";
import Lottie from "lottie-react";

type InputProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  touchedFields: boolean | undefined;
  error: string | undefined;
  type: string;
  register: UseFormRegister<TFieldValue>;
  icon: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  validationText?: string;
};
const InputForm = <TFieldValue extends FieldValues>({
  label,
  name,
  touchedFields,
  error,
  register,
  type,
  icon,
  onBlur,
  validationText,
}: InputProps<TFieldValue>) => {
  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(event);
      register(name).onBlur(event);
    } else {
      register(name).onBlur(event);
    }
  };

  return (
    <div className="d-flex flex-row align-items-start mb-4">
      <MDBIcon fas icon={`${icon} me-3`} size="lg" />
      <div>
        <MDBInput
          label={label}
          id={name}
          type={type}
          className={`w-100 ${
            name == "email"
              ? touchedFields && !error && validationText == "valid"
                ? "is-valid"
                : ""
              : touchedFields && !error
              ? "is-valid"
              : ""
          } ${error ? "is-invalid" : ""}`}
          {...register(name)}
          onBlur={onBlurHandler}
        />
        <p className="text-danger text-center m-0 fa-xs">{error}</p>
        {validationText == "checking" && (
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <p className="text-info fa-xm m-0">chicking Email Availability</p>
            <i className="fa fa-spinner fa-spin"></i>
          </div>
        )}
        {validationText == "valid" && (
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <p className="text-success fa-xm m-0 p-0">Email Available</p>
            <Lottie
              className="p-0"
              animationData={successAlert}
              loop={false}
              style={{ width: "20px" }}
            />
          </div>
        )}
        {validationText == "invalid" && (
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <p className="text-danger fa-xm m-0">Email Is Not Available</p>
            <Lottie
              animationData={wrongAlert}
              loop={false}
              style={{ width: "20px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputForm;
