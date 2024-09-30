import { TFormInputs, signUpSchema } from "@validation/SignUpValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import registerAnimation from "@assets/eCommerce.json";
import Lottie from "lottie-react";
import InputForm from "@components/common/Form/InputForm/InputForm";

function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm<TFormInputs>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmitForm: SubmitHandler<TFormInputs> = (data) => {
    console.log(data);
  };

  type TInputFields = {
    name: "firstName" | "lastName" | "email" | "password" | "confirmPassword";
    label: string;
    type: string;
    icon: string;
  };

  const inputFields: TInputFields[] = [
    { name: "firstName", label: "Your First Name", type: "text", icon: "user" },
    { name: "lastName", label: "Your Last Name", type: "text", icon: "user" },
    { name: "email", label: "Your Email", type: "email", icon: "envelope" },
    { name: "password", label: "Password", type: "password", icon: "lock" },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      icon: "key",
    },
  ];

  return (
    <MDBContainer fluid>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow className="justify-content-center">
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign Up
                </h1>

                {inputFields.map(({ name, label, type, icon }) => (
                  <InputForm
                    key={name}
                    name={name}
                    label={label}
                    type={type}
                    icon={icon}
                    register={register}
                    error={errors[name]?.message}
                    touchedFields={touchedFields[name]}
                  />
                ))}

                <button type="submit" className="btn btn-primary mt-4">
                  Register
                </button>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <Lottie animationData={registerAnimation} loop={true} />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </form>
    </MDBContainer>
  );
}

export default Register;
